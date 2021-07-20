# -*- coding: utf-8 -*-
import os
import re
import sys

import pygments
import qrcode
from pygments.formatters import HtmlFormatter
from pygments.lexers import get_lexer_by_name
from qrcode.image.svg import SvgPathImage
from six.moves import html_entities

from . import utils

try:
    from io import BytesIO as StringIO
except ImportError:
    from StringIO import StringIO


class Macro(object):
    """Base class for altering slide HTML during presentation generation"""

    def __init__(self, logger=sys.stdout.write, embed=False, options=None):
        self.logger = logger
        self.embed = embed
        if options:
            if not isinstance(options, dict):
                raise ValueError(u'Macro options must be a dict instance')
            self.options = options
        else:
            self.options = {}

    def process(self, content, source=None, context=None):
        """Generic processor (does actually nothing)"""
        return content, []


class CodeHighlightingMacro(Macro):
    """Performs syntax coloration in slide code blocks using Pygments"""

    macro_re = re.compile(
        r'(<pre.+?>(<code>)?\s?!(\S+?)\n(.*?)(</code>)?</pre>)',
        re.UNICODE | re.MULTILINE | re.DOTALL)

    html_entity_re = re.compile(r'&(\w+?);')

    def descape(self, string, defs=None):
        """Decodes html entities from a given string"""
        if defs is None:
            defs = html_entities.entitydefs

        def replacer(m):
            if len(m.groups()) > 0:
                return defs[m.group(1)]
            else:
                return m.group(0)

        return self.html_entity_re.sub(replacer, string)

    def process(self, content, source=None, context=None):
        code_blocks = self.macro_re.findall(content)
        if not code_blocks:
            return content, []

        classes = []
        for block, void1, lang, code, void2 in code_blocks:
            try:
                lexer = get_lexer_by_name(lang, startinline=True)
            except Exception:
                self.logger(u"Unknown pygment lexer \"%s\", skipping"
                            % lang, 'warning')
                return content, classes

            if 'linenos' not in self.options or self.options['linenos'] == 'no':
                self.options['linenos'] = False

            formatter = HtmlFormatter(linenos=self.options['linenos'],
                                      nobackground=True)
            pretty_code = pygments.highlight(self.descape(code), lexer,
                                             formatter)
            content = content.replace(block, pretty_code, 1)

        return content, [u'has_code']


class EmbedImagesMacro(Macro):
    """Encodes images in base64 for embedding in image:data"""
    macro_re = re.compile(
        r'<img\s.*?src="(.+?)"\s?.*?/?>|<object[^<>]+?data="(.*?)"[^<>]+?type="image/svg\+xml"',
        re.DOTALL | re.UNICODE)

    def process(self, content, source=None, context=None):
        classes = []

        if not self.embed:
            return content, classes

        images = self.macro_re.findall(content)

        source_dir = os.path.dirname(source)

        for image_url, data_url in images:
            encoded_url = utils.encode_data_from_url(image_url or data_url, source_dir)

            if not encoded_url:
                self.logger(u"Failed to embed image \"%s\"" % image_url, 'warning')
                return content, classes

            if image_url:
                content = content.replace(u"src=\"" + image_url,
                                          u"src=\"" + encoded_url, 1)
            else:
                content = content.replace(u"data=\"" + data_url,
                                          u"data=\"" + encoded_url, 1)

            self.logger(u"Embedded image %r" % (image_url or data_url), 'notice')

        return content, classes


class FixImagePathsMacro(Macro):
    """Replaces html image paths with fully qualified absolute urls"""

    macro_re = re.compile(
        r'<img.*?src="(?!https?://|file://)(.*?)"'
        r'|<object[^<>]+?data="(?!http://)(.*?)"[^<>]+?type="image/svg\+xml"',
        re.DOTALL | re.UNICODE
    )

    def process(self, content, source=None, context=None):
        classes = []

        if self.embed:
            return content, classes

        base_path = utils.get_path_url(source, self.options['relative'] and self.options['destination_dir'])
        base_url = os.path.split(base_path)[0]

        images = self.macro_re.findall(content)

        for matches in images:
            for image in matches:
                if image:
                    full_path = '"%s"' % os.path.join(base_url, image)
                    image = '"%s"' % image
                    content = content.replace(image, full_path)

        return content, classes


class FxMacro(Macro):
    """Adds custom CSS class to slides"""
    macro_re = re.compile(r'(<p>\.fx:\s?(.*?)</p>\n?)',
                          re.DOTALL | re.UNICODE)

    def process(self, content, source=None, context=None):
        classes = []

        fx_match = self.macro_re.search(content)
        if fx_match:
            classes = fx_match.group(2).split(u' ')
            content = content.replace(fx_match.group(1), '', 1)

        return content, classes


class NotesMacro(Macro):
    """Adds toggleable notes to slides"""
    macro_re = re.compile(r'<p>\.notes:\s?(.*?)</p>')

    def process(self, content, source=None, context=None):
        notes = []

        def repl(match):
            notes.append("<p>%s</p>" % match.group(1))
            return ''
        new_content = self.macro_re.sub(repl, content)

        if context is not None:
            context['presenter_notes'] = ''.join(notes)

        return new_content, []


class QRMacro(Macro):
    """Generates a QR code in a slide"""
    macro_re = re.compile(r'<p>\.qr:\s?(.*?)</p>')

    def process(self, content, source=None, context=None):
        classes = []

        def encoder(match):
            qr = qrcode.QRCode(1, error_correction=qrcode.ERROR_CORRECT_L, box_size=40)
            qr.add_data(match.group(1))
            buff = StringIO()
            qr.make_image(image_factory=SvgPathImage).save(buff)
            return '<p class="qr">%s</p>' % buff.getvalue().decode('utf-8')

        new_content = self.macro_re.sub(encoder, content)

        if content != new_content:
            classes.append(u'has_qr')

        return new_content, classes


class FooterMacro(Macro):
    """Add footer in slides"""
    footer = ''
    macro_re = re.compile(r'<p>\.footer:\s?(.*?)</p>')

    def process(self, content, source=None, context=None):
        classes = []

        def save(match):
            self.footer = match.group(1)
            return ''

        content = self.macro_re.sub(save, content)

        if self.footer:
            classes.append(u'has_footer')
            context['footer'] = self.footer

        return content, classes

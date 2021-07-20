# -*- coding: utf-8 -*-
import codecs
import inspect
import os
import re
import sys

import jinja2
from six import binary_type
from six import string_types
from six.moves import configparser

from . import __version__
from . import macro as macro_module
from . import utils
from .parser import Parser
from .utils import cached_property

BASE_DIR = os.path.dirname(__file__)
THEMES_DIR = os.path.join(BASE_DIR, 'themes')
MODS_DIR = os.path.join(BASE_DIR, 'mods')
VALID_LINENOS = ('no', 'inline', 'table')


class Generator(object):
    """
    The Generator class takes and processes presentation source as a file, a
    folder or a configuration file and provides methods to render them as a
    presentation.
    """
    default_macros = (
        macro_module.CodeHighlightingMacro,
        macro_module.EmbedImagesMacro,
        macro_module.FixImagePathsMacro,
        macro_module.FxMacro,
        macro_module.NotesMacro,
        macro_module.QRMacro,
        macro_module.FooterMacro,
    )

    def __init__(self, source, **kwargs):
        """
        Configures this generator. Available ``args`` are:
            - ``source``: source file or directory path
            Available ``kwargs`` are:
            - ``destination_file``: path to html destination file
            - ``direct``: enables direct rendering presentation to stdout
            - ``debug``: enables debug mode
            - ``embed``: generates a standalone document, with embedded assets
            - ``encoding``: the encoding to use for this presentation
            - ``extensions``: Comma separated list of markdown extensions
            - ``logger``: a logger lambda to use for logging
            - ``maxtoclevel``: the maximum level to include in toc
            - ``presenter_notes``: enable presenter notes
            - ``relative``: enable relative asset urls
            - ``theme``: path to the theme to use for this presentation
            - ``theme_mod``: modifications to the default theme
            - ``verbose``: enables verbose output
        """
        self.debug = kwargs.get('debug', False)
        self.destination_file = kwargs.get('destination_file', 'presentation.html')
        self.direct = kwargs.get('direct', False)
        self.embed = kwargs.get('embed', False)
        self.encoding = kwargs.get('encoding', 'utf8')
        self.extensions = kwargs.get('extensions', None)
        self.logger = kwargs.get('logger', None)
        self.maxtoclevel = kwargs.get('maxtoclevel', 2)
        self.presenter_notes = kwargs.get('presenter_notes', True)
        self.relative = kwargs.get('relative', False)
        self.theme = kwargs.get('theme', 'default')
        self.theme_mod = kwargs.get('theme_mod', '')
        self.verbose = kwargs.get('verbose', False)
        self.linenos = self.linenos_check(kwargs.get('linenos'))
        self.watch = kwargs.get('watch', False)
        self.num_slides = 0
        self.__toc = []

        if self.direct:
            # Only output html in direct output mode, not log messages
            self.verbose = False

        if not source or not os.path.exists(source):
            raise IOError("Source file/directory %s does not exist" % source)

        if source.endswith('.cfg'):
            self.work_dir = os.path.dirname(source)
            config = self.parse_config(source)
            self.source = config.get('source')
            if not self.source:
                raise IOError('unable to fetch a valid source from config')
            source_abspath = os.path.abspath(self.source[0])
            self.destination_file = config.get('destination', self.destination_file)
            self.embed = config.get('embed', self.embed)
            self.relative = config.get('relative', self.relative)
            self.extensions = config.get('extensions', self.extensions)
            self.maxtoclevel = config.get('max-toc-level', self.maxtoclevel)
            self.theme = config.get('theme', self.theme)
            self.destination_dir = os.path.dirname(self.destination_file)
            self.user_css = config.get('css', [])
            self.user_js = config.get('js', [])
            self.linenos = self.linenos_check(config.get('linenos', self.linenos))
        else:
            self.source = source
            self.work_dir = '.'
            self.destination_dir = os.path.dirname(self.destination_file)

            source_abspath = os.path.abspath(source)

        if not os.path.isdir(source_abspath):
            source_abspath = os.path.dirname(source_abspath)

        self.watch_dir = source_abspath

        if os.path.exists(self.destination_file) and not os.path.isfile(self.destination_file):
            raise IOError("Destination %s exists and is not a file" % self.destination_file)

        self.theme_paths = [
            os.path.join(THEMES_DIR, self.theme),
            os.path.join(THEMES_DIR, 'default'),
        ]
        if self.theme_mod:
            self.theme_paths.append(os.path.join(MODS_DIR, self.theme_mod))

        self.template_file = self.lookup_file('template.html')

        # macros registering
        self.macros = []
        self.register_macro(*self.default_macros)

    def lookup_file(self, name):
        for path in self.theme_paths:
            absname = os.path.join(path, name)
            if os.path.exists(absname):
                return absname
        else:
            raise RuntimeError("Could not find %s in %s" % (name, self.theme_paths))

    def process_user_files(self, files):
        if isinstance(files, string_types):
            files = [files]
        for path in files:
            if path.startswith(("http://", "https://")):
                yield {
                    'path_url': path,
                    'contents': '',
                    'dirname': '',
                    'embeddable': False,
                }
                self.log("Loaded:  %s (not embeddable)\n" % path)
            else:
                path = os.path.normpath(os.path.join(self.work_dir, path))
                if not os.path.exists(path):
                    raise IOError('%s user file not found' % (path,))
                with codecs.open(path, encoding=self.encoding) as fh:
                    yield {
                        'path_url': utils.get_path_url(path, self.relative and self.destination_dir),
                        'dirname': os.path.dirname(path) or '.',
                        'contents': fh.read(),
                        'embeddable': True,
                    }
                    self.log("Loaded:  %s\n" % path)

    def add_toc_entry(self, title, level, slide_number):
        """
        Adds a new entry to current presentation Table of Contents.
        """
        self.__toc.append({'title': title, 'number': slide_number,
                           'level': level})

    @property
    def toc(self):
        """
        Smart getter for Table of Content list.
        """
        toc = []
        stack = [toc]
        for entry in self.__toc:
            entry['sub'] = []
            while entry['level'] < len(stack):
                stack.pop()
            while entry['level'] > len(stack):
                stack.append(stack[-1][-1]['sub'])
            stack[-1].append(entry)
        return toc

    def execute(self):
        """
        Execute this generator regarding its current configuration.
        """
        if self.direct:
            out = getattr(sys.stdout, 'buffer', sys.stdout)
            out.write(self.render().encode(self.encoding))
        else:
            self.write_and_log()

            if self.watch:
                from .watcher import watch

                self.log(u"Watching %s\n" % self.watch_dir)

                watch(self.watch_dir, self.write_and_log)

    def write_and_log(self):
        self.num_slides = 0
        self.__toc = []
        self.write()
        self.log(u"Generated file: %s" % self.destination_file)

    def fetch_contents(self, source, work_dir):
        """
        Recursively fetches contents from a single file or
        directory containing itself Markdown/RST files.
        """
        slides = []

        if type(source) is list:
            for entry in source:
                slides.extend(self.fetch_contents(entry, work_dir))
        else:
            source = os.path.normpath(os.path.join(work_dir, source))
            if os.path.isdir(source):
                self.log(u"Entering %r" % source)
                entries = os.listdir(source)
                entries.sort()
                for entry in entries:
                    slides.extend(self.fetch_contents(entry, source))
            else:
                try:
                    parser = Parser(os.path.splitext(source)[1], self.encoding, self.extensions)
                except NotImplementedError as exc:
                    self.log(u"Failed   %r: %r" % (source, exc))
                    return slides

                self.log(u"Adding   %r (%s)" % (source, parser.format))

                try:
                    with codecs.open(source, encoding=self.encoding) as file:
                        file_contents = file.read()
                except UnicodeDecodeError:
                    self.log(u"Unable to decode source %r: skipping" % source,
                             'warning')
                else:
                    inner_slides = re.split(r'<hr.+>', parser.parse(file_contents))
                    for inner_slide in inner_slides:
                        slides.append(self.get_slide_vars(inner_slide, source))

        if not slides:
            self.log(u"Exiting  %r: no contents found" % source, 'notice')

        return slides

    def read_asset(self, path):
        """
        Load a CSS file from the given path.
        """
        with codecs.open(path, encoding=self.encoding) as asset:
            return {
                'path_url': utils.get_path_url(path, self.relative and self.destination_dir),
                'contents': asset.read(),
                'dirname': os.path.dirname(path),
                'embeddable': True
            }

    @cached_property
    def css_assets(self):
        """ Fetches and returns stylesheet file path or contents, for both
            print and screen contexts, depending if we want a standalone
            presentation or not.
        """
        css = [
            self.read_asset(self.lookup_file(os.path.join('css', 'base.css'))),
            self.read_asset(self.lookup_file(os.path.join('css', 'print.css'))),
            self.read_asset(self.lookup_file(os.path.join('css', 'screen.css'))),
            self.read_asset(self.lookup_file(os.path.join('css', 'theme.css'))),
        ]
        if self.theme_mod:
            css.append(self.read_asset(self.lookup_file(os.path.join('css', 'mod.css'))))
            css.append(self.read_asset(self.lookup_file(os.path.join('css', 'mod.css'))))
        css.extend(self.process_user_files(self.user_css))
        return css

    @cached_property
    def js_assets(self):
        """
        Fetches and returns javascript file path or contents, depending if
        we want a standalone presentation or not.
        """
        js = [self.read_asset(self.lookup_file(os.path.join('js', 'slides.js')))]
        js.extend(self.process_user_files(self.user_js))
        return js

    def get_slide_vars(self, slide_src, source,
                       _presenter_notes_re=re.compile(r'<h\d[^>]*>presenter notes</h\d>',
                                                      re.DOTALL | re.UNICODE | re.IGNORECASE),
                       _slide_title_re=re.compile(r'(<h(\d+?).*?>(.+?)</h\d>)\s?(.+)?', re.DOTALL | re.UNICODE)):
        """
        Computes a single slide template vars from its html source code.
        Also extracts slide information for the table of contents.
        """
        presenter_notes = ''

        find = _presenter_notes_re.search(slide_src)

        if find:
            if self.presenter_notes:
                presenter_notes = slide_src[find.end():].strip()

            slide_src = slide_src[:find.start()]

        find = _slide_title_re.search(slide_src)

        if not find:
            header = level = title = None
            content = slide_src.strip()
        else:
            header = find.group(1)
            level = int(find.group(2))
            title = find.group(3)
            content = find.group(4).strip() if find.group(4) else find.group(4)

        slide_classes = []
        context = {}

        if header:
            header, _ = self.process_macros(header, source, context)

        if content:
            content, slide_classes = self.process_macros(content, source, context)

        source_dict = {}

        if source:
            source_dict = {
                'rel_path': source.decode(sys.getfilesystemencoding(), 'ignore') if isinstance(source,
                                                                                               binary_type) else source,
                'abs_path': os.path.abspath(source)
            }

        if header or content:
            context.update(
                content=content,
                classes=slide_classes,
                header=header,
                level=level,
                source=source_dict,
                title=title,
            )
            context.setdefault('presenter_notes', '')
            context['presenter_notes'] += presenter_notes
            if not context['presenter_notes']:
                context['presenter_notes'] = None
            return context

    def get_template_vars(self, slides):
        """
        Computes template vars from slides html source code.
        """
        try:
            head_title = slides[0]['title']
        except (IndexError, TypeError):
            head_title = "Untitled Presentation"

        for slide_index, slide_vars in enumerate(slides):
            if not slide_vars:
                continue
            self.num_slides += 1
            slide_number = slide_vars['number'] = self.num_slides
            if slide_vars['level'] and slide_vars['level'] <= self.maxtoclevel:
                # only show slides that have a title and lever is not too deep
                self.add_toc_entry(slide_vars['title'], slide_vars['level'], slide_number)

        return {
            'head_title': head_title,
            'num_slides': str(self.num_slides),
            'slides': slides,
            'toc': self.toc,
            'embed': self.embed,
            'css_assets': self.css_assets,
            'js_assets': self.js_assets,
            'version': __version__
        }

    def linenos_check(self, value):
        """
        Checks and returns a valid value for the ``linenos`` option.
        """
        return value if value in VALID_LINENOS else 'inline'

    def log(self, message, type='notice'):
        """
        Logs a message (eventually, override to do something more clever).
        """
        if self.logger and not callable(self.logger):
            raise ValueError(u"Invalid logger set, must be a callable")
        if self.verbose and self.logger:
            self.logger(message, type)

    def parse_config(self, config_source):
        """
        Parses a landslide configuration file and returns a normalized
        python dict.
        """
        self.log(u"Reading config: %s" % config_source)
        try:
            raw_config = configparser.RawConfigParser()
            raw_config.read(config_source)
        except Exception as e:
            raise RuntimeError(u"Invalid configuration file: %s" % e)
        section_name = 'landslide' if raw_config.has_section('landslide') else 'darkslide'
        config = {
            'source': raw_config.get(section_name, 'source').replace('\r', '').split('\n')
        }
        if raw_config.has_option(section_name, 'theme'):
            config['theme'] = raw_config.get(section_name, 'theme')
            self.log(u"Using configured theme: %s" % config['theme'])
        if raw_config.has_option(section_name, 'destination'):
            config['destination'] = raw_config.get(section_name, 'destination')
        if raw_config.has_option(section_name, 'linenos'):
            config['linenos'] = raw_config.get(section_name, 'linenos')
        if raw_config.has_option(section_name, 'max-toc-level'):
            config['max-toc-level'] = int(raw_config.get(section_name, 'max-toc-level'))
        for boolopt in ('embed', 'relative'):
            if raw_config.has_option(section_name, boolopt):
                config[boolopt] = raw_config.getboolean(section_name, boolopt)
        if raw_config.has_option(section_name, 'extensions'):
            config['extensions'] = ",".join(raw_config.get(section_name, 'extensions').replace('\r', '').split('\n'))
        if raw_config.has_option(section_name, 'css'):
            config['css'] = raw_config.get(section_name, 'css').replace('\r', '').split('\n')
        if raw_config.has_option(section_name, 'js'):
            config['js'] = raw_config.get(section_name, 'js').replace('\r', '').split('\n')
        return config

    def process_macros(self, content, source, context):
        """
        Process all macros.
        """
        classes = []
        for macro in self.macros:
            content, add_classes = macro.process(content, source, context)
            if add_classes:
                classes += add_classes
        return content, classes

    def register_macro(self, *macros):
        """
        Registers macro classes passed a method arguments.
        """
        macro_options = {'relative': self.relative, 'linenos': self.linenos, 'destination_dir': self.destination_dir}
        for m in macros:
            if inspect.isclass(m) and issubclass(m, macro_module.Macro):
                self.macros.append(m(logger=self.logger, embed=self.embed, options=macro_options))
            else:
                raise TypeError("Couldn't register macro; a macro must inherit"
                                " from macro.Macro")

    def embed_url_data(self, context, html):
        """
        Find all image and fonts referenced in CSS with an ``url()`` function
        and embed them in base64. Images from the user (i.e. included in its
        source code, *not* in its CSS) are embedded by the macro `EmbedImagesMacro`.
        """
        all_urls = re.findall(r'url\([\"\']?(.*?)[\"\']?\)', html,
                              re.DOTALL | re.UNICODE)
        embed_exts = ('.jpg', '.jpeg', '.png', '.gif', '.svg', '.woff2',
                      '.woff')
        embed_urls = (url for url in all_urls if url.endswith(embed_exts))

        css_dirs = [asset['dirname'] for asset in self.css_assets]

        for embed_url in embed_urls:
            embed_url = embed_url.replace('"', '').replace("'", '')

            directory, encoded_url = None, None
            for directory in css_dirs:
                encoded_url = utils.encode_data_from_url(embed_url, directory)
                if encoded_url:
                    break

            if encoded_url:
                html = html.replace(embed_url, encoded_url, 1)
                self.log("Embedded theme file %s from directory %s"
                         % (embed_url, directory))
            else:
                self.log(u"Failed to embed theme file %s" % embed_url)

        return html

    def render(self):
        """
        Returns generated html code.
        """
        with codecs.open(self.template_file, encoding=self.encoding) as template_src:
            template = jinja2.Template(template_src.read())
        slides = self.fetch_contents(self.source, self.work_dir)
        context = self.get_template_vars(slides)

        html = template.render(context)

        if self.embed:
            html = self.embed_url_data(context, html)

        return html

    def write(self):
        """
        Writes generated presentation code into the destination file.
        """
        html = self.render()
        dirname = os.path.dirname(self.destination_file)
        if dirname and not os.path.exists(dirname):
            os.makedirs(dirname)
        with codecs.open(self.destination_file, 'w',
                         encoding='utf_8') as outfile:
            outfile.write(html)

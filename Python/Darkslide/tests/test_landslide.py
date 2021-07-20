# -*- coding: utf-8 -*-
import base64
import codecs
import os
import re

from pytest import raises

from darkslide import macro
from darkslide.generator import Generator
from darkslide.parser import Parser

DATA_DIR = os.path.join(os.path.dirname(__file__), 'test-data')

if not os.path.exists(DATA_DIR):
    raise IOError('Test data not found, cannot run tests')


def logtest(message, type='notice'):
    if type == 'warning':
        raise WarningMessage(message)
    elif type == 'error':
        raise ErrorMessage(message)


def test_generator__init__():
    raises(IOError, Generator, None)
    raises(IOError, Generator, 'foo.md')


def test_add_user_assets():
    base_dir = os.path.join(DATA_DIR, 'test.md')
    g = Generator(base_dir, logger=logtest)
    g.user_css.extend(g.process_user_files(os.path.join(DATA_DIR, 'test.css')))
    g.user_js.extend(g.process_user_files(os.path.join(DATA_DIR, 'test.js')))
    assert g.user_css[0]['contents'] == '* {color: red;}'
    assert g.user_js[0]['contents'] == "alert('foo');"


def test_get_toc():
    base_dir = os.path.join(DATA_DIR, 'test.md')
    g = Generator(base_dir, logger=logtest)
    g.add_toc_entry('Section 1', 1, 1)
    g.add_toc_entry('Section 1.1', 2, 2)
    g.add_toc_entry('Section 1.2', 2, 3)
    g.add_toc_entry('Section 2', 1, 4)
    g.add_toc_entry('Section 2.1', 2, 5)
    g.add_toc_entry('Section 3', 1, 6)
    toc = g.toc
    assert len(toc) == 3
    assert toc[0]['title'] == 'Section 1'
    assert len(toc[0]['sub']) == 2
    assert toc[0]['sub'][1]['title'] == 'Section 1.2'
    assert toc[1]['title'] == 'Section 2'
    assert len(toc[1]['sub']) == 1
    assert toc[2]['title'] == 'Section 3'
    assert len(toc[2]['sub']) == 0


def test_get_slide_vars():
    g = Generator(os.path.join(DATA_DIR, 'test.md'))
    svars = g.get_slide_vars("<h1>heading</h1>\n<p>foo</p>\n<p>bar</p>\n", '')
    assert svars['title'] == 'heading'
    assert svars['level'] == 1
    assert svars['header'] == '<h1>heading</h1>'
    assert svars['content'] == '<p>foo</p>\n<p>bar</p>'
    assert svars['source'] == {}
    assert svars['classes'] == []


def test_unicode():
    g = Generator(os.path.join(DATA_DIR, 'test.md'))
    g.execute()
    s = g.render()
    assert s.find('<pre>') != -1
    assert len(re.findall('<pre><span', s)) == 3


def test_direct():
    g = Generator(os.path.join(DATA_DIR, 'test.md'), direct=True)
    g.execute()


def test_inputencoding():
    path = os.path.join(DATA_DIR, 'encoding.rst')
    g = Generator(path, encoding='koi8_r')
    content = g.render()

    # check that the string is utf_8
    assert u'русский' in content
    g.execute()
    with codecs.open(g.destination_file, encoding='utf_8') as file_object:
        file_contents = file_object.read()
    # check that the file was properly encoded in utf_8
    assert u'русский' in file_contents


def test_weird_filename():
    path = os.path.join(DATA_DIR, u'căcăneață.rst')
    g = Generator(path)
    content = g.render()

    # check that the string is utf_8
    assert u'țară' in content
    g.execute()
    with codecs.open(g.destination_file, encoding='utf_8') as file_object:
        file_contents = file_object.read()
    # check that the file was properly encoded in utf_8
    assert u'țară' in file_contents


def test_get_template_vars():
    g = Generator(os.path.join(DATA_DIR, 'test.md'))
    svars = g.get_template_vars([{'title': "slide1", 'level': 1},
                                 {'title': "slide2", 'level': 1},
                                 {'title': None, 'level': 1},
                                 ])
    assert svars['head_title'] == 'slide1'


def test_process_macros():
    g = Generator(os.path.join(DATA_DIR, 'test.md'))
    # Notes
    ctx = {}
    r = g.process_macros('<p>foo</p>\n<p>.notes: bar</p>\n<p>baz</p>', '', ctx)
    assert r[0].find('bar') == -1
    assert r[1] == []
    assert ctx == {'presenter_notes': '<p>bar</p>'}
    # FXs
    content = '<p>foo</p>\n<p>.fx: blah blob</p>\n<p>baz</p>'
    r = g.process_macros(content, '', {})
    assert r[0] == '<p>foo</p>\n<p>baz</p>'
    assert r[1][0] == 'blah'
    assert r[1][1] == 'blob'


def test_register_macro():
    g = Generator(os.path.join(DATA_DIR, 'test.md'))

    class SampleMacro(macro.Macro):
        pass

    g.register_macro(SampleMacro)
    assert any(isinstance(i, SampleMacro) for i in g.macros)

    def plop(foo):
        pass

    raises(TypeError, g.register_macro, plop)


def test_presenter_notes():
    g = Generator(os.path.join(DATA_DIR, 'test.md'))
    svars = g.get_slide_vars("<h1>heading</h1>\n<p>foo</p>\n"
                             "<h1>Presenter Notes</h1>\n<p>bar</p>\n", '')
    assert svars['presenter_notes'] == "<p>bar</p>"

    # Check that presenter notes work even if the slide has no heading.
    # For example, if it is only an image:

    g = Generator(os.path.join(DATA_DIR, 'test.md'))
    svars = g.get_slide_vars("<p>foo</p>\n"
                             "<h1>Presenter Notes</h1>\n<p>bar</p>\n", '')


def test_skip_presenter_notes():
    g = Generator(os.path.join(DATA_DIR, 'test.md'),
                  presenter_notes=False)
    svars = g.get_slide_vars("<h1>heading</h1>\n<p>foo</p>\n"
                             "<h1>Presenter Notes</h1>\n<p>bar</p>\n", '')
    assert svars['presenter_notes'] is None


SAMPLE_HTML = '''<p>Let me give you this snippet:</p>
<pre class="literal-block">
!python
def foo():
    &quot;just a test&quot;
    print bar
</pre>
<p>Then this one:</p>
<pre class="literal-block">
!php
<?php
echo $bar;
?>
</pre>
<p>Then this other one:</p>
<pre class="literal-block">
!xml
<foo>
    <bar glop="yataa">baz</bar>
</foo>
</pre>
<p>End here.</p>'''


def test_macro_parsing_code_blocks():
    m = macro.CodeHighlightingMacro(logtest)
    blocks = m.macro_re.findall(SAMPLE_HTML)
    assert len(blocks) == 3
    assert blocks[0][2] == 'python'
    assert blocks[0][3].startswith('def foo():')
    assert blocks[1][2] == 'php'
    assert blocks[1][3].startswith('<?php')
    assert blocks[2][2] == 'xml'
    assert blocks[2][3].startswith('<foo>')


def test_macro_descape():
    m = macro.CodeHighlightingMacro(logtest)
    assert m.descape('foo') == 'foo'
    assert m.descape('&gt;') == '>'
    assert m.descape('&lt;') == '<'
    assert m.descape('&amp;lt;') == '&lt;'
    assert m.descape('&lt;span&gt;') == '<span>'
    assert m.descape('&lt;spam&amp;eggs&gt;') == '<spam&eggs>'


def test_macro_process():
    m = macro.CodeHighlightingMacro(logtest)
    hl = m.process("<pre><code>!php\n$foo;</code></pre>")
    assert hl[0].startswith('<div class="highlight"><pre')
    assert hl[1][0] == u'has_code'
    input = "<p>Nothing to declare</p>"
    assert m.process(input)[0] == input
    assert m.process(input)[1] == []


def test_macro_process_rst_code_blocks():
    m = macro.CodeHighlightingMacro(logtest)
    hl = m.process(SAMPLE_HTML)
    assert hl[0].startswith('<p>Let me give you this')
    assert hl[0].find('<p>Then this one') > 0
    assert hl[0].find('<p>Then this other one') > 0
    assert hl[0].find('<div class="highlight"><pre') > 0
    assert hl[1][0] == u'has_code'


def test_embed_images_macro_process():
    base_dir = os.path.join(DATA_DIR, 'test.md')
    m = macro.EmbedImagesMacro(logtest, True)
    raises(WarningMessage, m.process,
           '<img src="img.png"/>', '.')
    content, classes = m.process('<img src="img.png"/>', base_dir)
    match = re.search(r'<img src="data:image/png;base64,(.+?)"/>',
                      content)
    assert base64.b64decode(match.group(1))


def test_fix_image_paths_macro_process():
    base_dir = os.path.join(DATA_DIR, 'test.md')
    m = macro.FixImagePathsMacro(logtest, False, options={"relative": False})
    content, classes = m.process('<img src="img.png"/>', base_dir)
    assert re.match(r'<img src="file://.*?[\\/]img.png" */>', content), content


def test_fx_macro_process():
    m = macro.FxMacro(logtest)
    content = '<p>foo</p>\n<p>.fx: blah blob</p>\n<p>baz</p>'
    r = m.process(content)
    assert r[0] == '<p>foo</p>\n<p>baz</p>'
    assert r[1][0] == 'blah'
    assert r[1][1] == 'blob'


def test_notes_macro_process():
    m = macro.NotesMacro(logtest)
    r = m.process('<p>foo</p>\n<p>.notes: bar</p>\n<p>baz</p>')
    assert r[0].find('bar') == -1
    assert r[1] == []


def test_parser__init__():
    assert Parser('.md').format == 'markdown'
    assert Parser('.markdown').format == 'markdown'
    assert Parser('.rst').format == 'restructuredtext'
    raises(NotImplementedError, Parser, '.txt')


class WarningMessage(Exception):
    pass


class ErrorMessage(Exception):
    pass

========
Overview
========

.. start-badges

.. list-table::
    :stub-columns: 1

    * - tests
      - | |travis| |appveyor| |requires|
        | |coveralls| |codecov|
        | |landscape| |scrutinizer| |codacy| |codeclimate|
    * - package
      - | |version| |wheel| |supported-versions| |supported-implementations|
        | |commits-since|

.. |travis| image:: https://api.travis-ci.org/ionelmc/python-darkslide.svg?branch=master
    :alt: Travis-CI Build Status
    :target: https://travis-ci.org/ionelmc/python-darkslide

.. |appveyor| image:: https://ci.appveyor.com/api/projects/status/github/ionelmc/python-darkslide?branch=master&svg=true
    :alt: AppVeyor Build Status
    :target: https://ci.appveyor.com/project/ionelmc/python-darkslide

.. |requires| image:: https://requires.io/github/ionelmc/python-darkslide/requirements.svg?branch=master
    :alt: Requirements Status
    :target: https://requires.io/github/ionelmc/python-darkslide/requirements/?branch=master

.. |coveralls| image:: https://coveralls.io/repos/ionelmc/python-darkslide/badge.svg?branch=master&service=github
    :alt: Coverage Status
    :target: https://coveralls.io/r/ionelmc/python-darkslide

.. |codecov| image:: https://codecov.io/github/ionelmc/python-darkslide/coverage.svg?branch=master
    :alt: Coverage Status
    :target: https://codecov.io/github/ionelmc/python-darkslide

.. |landscape| image:: https://landscape.io/github/ionelmc/python-darkslide/master/landscape.svg?style=flat
    :target: https://landscape.io/github/ionelmc/python-darkslide/master
    :alt: Code Quality Status

.. |codacy| image:: https://img.shields.io/codacy/grade/862e7946eabb4112be6503a667381b71.svg
    :target: https://www.codacy.com/app/ionelmc/python-darkslide
    :alt: Codacy Code Quality Status

.. |codeclimate| image:: https://codeclimate.com/github/ionelmc/python-darkslide/badges/gpa.svg
   :target: https://codeclimate.com/github/ionelmc/python-darkslide
   :alt: CodeClimate Quality Status

.. |version| image:: https://img.shields.io/pypi/v/darkslide.svg
    :alt: PyPI Package latest release
    :target: https://pypi.org/project/darkslide

.. |wheel| image:: https://img.shields.io/pypi/wheel/darkslide.svg
    :alt: PyPI Wheel
    :target: https://pypi.org/project/darkslide

.. |supported-versions| image:: https://img.shields.io/pypi/pyversions/darkslide.svg
    :alt: Supported versions
    :target: https://pypi.org/project/darkslide

.. |supported-implementations| image:: https://img.shields.io/pypi/implementation/darkslide.svg
    :alt: Supported implementations
    :target: https://pypi.org/project/darkslide

.. |commits-since| image:: https://img.shields.io/github/commits-since/ionelmc/python-darkslide/v5.1.0.svg
    :alt: Commits since latest release
    :target: https://github.com/ionelmc/python-darkslide/compare/v5.1.0...master


.. |scrutinizer| image:: https://img.shields.io/scrutinizer/quality/g/ionelmc/python-darkslide/master.svg
    :alt: Scrutinizer Status
    :target: https://scrutinizer-ci.com/g/ionelmc/python-darkslide/


.. end-badges

Lightweight markup language (Markdown, ReST, or Textile) slideshow generator. Forked from landslide.

Demo: http://ionelmc.github.io/python-darkslide/

::

    # Darkslide

    ---

    # Overview

    Generate HTML5 slideshows from markdown, ReST, or textile.

    ![python](http://i.imgur.com/bc2xk.png)

    Darkslide is primarily written in Python, but it's themes use:

    - HTML5
    - Javascript
    - CSS

    ---

    # Code Sample

    Darkslide supports code snippets

        !python
        def log(self, message, level='notice'):
            if self.logger and not callable(self.logger):
                raise ValueError(u"Invalid logger set, must be a callable")

            if self.verbose and self.logger:
                self.logger(message, level)

Requirements
============

``python`` and the following modules:

-  ``jinja2``
-  ``pygments`` for code blocks syntax coloration

Markup Conversion
-----------------

-  ``markdown`` for `Markdown <http://en.wikipedia.org/wiki/Markdown>`__
-  ``docutils`` for `reStructured
   Text <http://en.wikipedia.org/wiki/ReStructuredText>`__
-  ``textile`` for
   `Textile <http://en.wikipedia.org/wiki/Textile_(markup_language)>`__

Optional
--------

-  ``watchdog`` for watching/auto-regeneration with the ``-w`` flag

Installation
============

Install the latest stable version of Darkslide with a python package
manager like ``pip``:

::

    $ pip install darkslide

If you want to stay on the edge:

::

    $ git clone https://github.com/ionelmc/python-darkslide.git
    $ cd python-darkslide
    $ python setup.py build
    $ sudo python setup.py install

Formatting
==========

Markdown
--------

-  Your Markdown source files must be suffixed by ``.md``, ``.markdn``,
   ``.mdwn``, ``.mdown`` or ``.markdown``
-  To create a title slide, render a single ``h1`` element (eg.
   ``# My Title``)
-  Separate your slides with a horizontal rule (``---`` in markdown)
   except at the end of md files
-  Your other slides should have a heading that renders to an ``h1``
   element
-  To highlight blocks of code, put ``!lang`` where ``lang`` is the
   pygment supported language identifier as the first indented line

ReStructuredText
----------------

-  Your ReST source files must be suffixed by ``.rst`` or ``.rest``
   (**``.txt`` is not supported**)
-  Use headings for slide titles
-  Separate your slides using an horizontal rule (``----`` in RST)
   except at the end of RST files

Textile
-------

-  Separate your slides using ``---``, just like in markdown

Rendering
=========

-  Run ``darkslide slides.md`` or ``darkslide slides.rst``
-  Enjoy your newly generated ``presentation.html``

Viewing
=======

-  Press ``h`` to toggle display of help
-  Press ``left arrow`` and ``right arrow`` to navigate
-  Press ``t`` to toggle a table of contents for your presentation.
   Slide titles are links
-  Press ``ESC`` to display the presentation overview (Exposé)
-  Press ``n`` to toggle slide number visibility
-  Press ``b`` to toggle screen blanking
-  Press ``c`` to toggle double slide display (current and next
   slides)
-  Press ``S`` to toggle display of link to the source file for each
   slide
-  Press '2' to toggle notes in your slides (specify with the .notes
   macro)
-  Browser zooming is *not* supported

Commandline Options
===================

Usage::

    darkslide [options] input.md ...

Options:
  --version             show program's version number and exit
  -h, --help            show this help message and exit
  -b, --debug           Will display any exception trace to stdout.
  -d FILE, --destination=FILE
                        The path to the to the destination html file. Default:
                        presentation.html.
  -e ENCODING, --encoding=ENCODING
                        The encoding of your files. Default: utf8.
  -i, --embed           Embed stylesheet and javascript contents,
                        base64-encoded images and objects in presentation to
                        make a standalone document.
  -l LINENOS, --linenos=LINENOS
                        How to output linenos in source code. Three options
                        available: no (no line numbers); inline (inside <pre>
                        tag); table (lines numbers in another cell, copy-paste
                        friendly).
  -m LEVEL, --max-toc-level=LEVEL
                        Limits the TOC level generation to a specific level.
  -M, --mod=MOD
                        Specify a theme modifier by name. Available: wide16x9.
  -o, --direct-output   Prints the generated HTML code to stdout.
  -P, --no-presenter-notes
                        Don't include presenter notes in the output.
  -q, --quiet           Won't write anything to stdout (silent mode).
  -r, --relative        Make your presentation asset links relative to current
                        working dir; This may be useful if you intend to
                        publish your html presentation online.
  -t THEME, --theme=THEME
                        A theme name, or path to a darkslide theme directory
  -v, --verbose         Write informational messages to stdout (enabled by
                        default).
  -x EXTENSIONS, --extensions=EXTENSIONS
                        Comma-separated list of extensions for Markdown.
  -w, --watch           Watch source directory for changes and regenerate
                        slides.

Presentation Configuration
==========================

Darkslide allows to configure your presentation using a ``cfg``
configuration file, therefore easing the aggregation of source
directories and the reuse of them across presentations. Darkslide
configuration files use the ``cfg`` syntax. If you know ``ini`` files,
you get the picture. Below is a sample configuration file:

.. code-block:: ini

    [darkslide]
    ; the old [landslide] is still supported
    theme  = /path/to/my/beautiful/theme
    source = 0_my_first_slides.md
             a_directory
             another_directory
             now_a_slide.markdown
             another_one.rst
    destination = myWonderfulPresentation.html
    css =    my_first_stylesheet.css
             my_other_stylesheet.css
    js =     jquery.js
             my_fancy_javascript.js
    relative = True
    linenos = inline

Don't forget to declare the ``[darkslide]`` section. All configuration
files must end in the .cfg extension.

To generate the presentation as configured, just run:

::

    $ cd /path/to/my/presentation/sources
    $ darkslide config.cfg

Macros
======

You can use macros to enhance your presentation:

Notes
-----

Add notes to your slides using the ``.notes:`` keyword, eg.:

::

    # My Slide Title

    .notes: These are my notes, hidden by default

    My visible content goes here

You can toggle display of notes by pressing the ``2`` key.

Some other macros are also available by default: ``.fx: foo bar`` will
add the ``foo`` and ``bar`` classes to the corresponding slide ``<div>``
element, easing styling of your presentation using CSS.

QR Codes
--------

Add a QR Code to your presentation by using the ``.qr`` keyword:

::

    .qr: 450|https://github.com/ionelmc/python-darkslide

Footnote
--------

Add footnote to the current and all the following presentations

::

    .footnote: Slides available at https://blog.ionelmc.ro/presentations/


Presenter Notes
===============

You can also add presenter notes to each slide by following the slide
content with a heading entitled "Presenter Notes". Press the 'p' key to
open the presenter view.

Registering Macros
==================

Macros are used to transform the HTML contents of your slide.

You can register your own macros by creating ``darkslide.macro.Macro``
derived classes, implementing a ``process(content, source=None)`` method
and returning a tuple containing the modified contents and some css
classes you may be wanting to add to your slide ``<div>`` element. For
example:

::

    !python
    import darkslide

    class MyMacro(darkslide.Macro):
      def process(self, content, source=None):
        return content + '<p>plop</p>', ['plopped_slide']

    g = darkslide.generator.Generator(source='toto.md')
    g.register_macro(MyMacro)
    print g.render()

This will render any slide as below:

::

    !html
    <div class="slide plopped_slide">
      <header><h2>foo</h2></header>
      <section>
        <p>my slide contents</p>
        <p>plop</p>
      </section>
    </div>

Advanced Usage
==============

Setting Custom Destination File
-------------------------------

::

    $ darkslide slides.md -d ~/MyPresentations/presentation.html

Working with Directories
------------------------

::

    $ darkslide slides/

Working with Direct Output
--------------------------

::

    $ darkslide slides.md -o | tidy

Using an Alternate Darkslide Theme
----------------------------------

::

    $ darkslide slides.md -t mytheme
    $ darkslide slides.md -t /path/to/theme/dir

Embedding Base-64-Encoded Images
--------------------------------

::

    $ darkslide slides.md -i

Enabling Markdown Extensions
----------------------------

See documentation on available Markdown extensions
`here <https://pythonhosted.org/Markdown/extensions/index.html>`__:

::

    $ darkslide slides.md -x abbr

Theming
-------

A Darkslide theme is a directory following this simple structure:

::

    mytheme/
    |-- base.html
    |-- css
    |   |-- print.css
    |   `-- screen.css
    `-- js
        `-- slides.js

If a theme does not provide HTML and JS files, those from the default
theme will be used. CSS is not optional.

Widescreen 16x9
---------------

You can create widescreen 16x9 slides using the ``--mod=wide16x9`` option.

**NOTE:** The ``--mod=wide16x9`` option causes the files in Darkslide's ``themes/wide16x9/``
directory to supersede the corresponding files in Darkslide's ``themes/default/``
directory before the selected theme (if any) is applied.

User stylesheets and Javascripts
================================

If you don't want to bother making your own theme, you can include your
own user css and js files to the generated presentation.

This feature is only available if you use a Darkslide configuration
file, by setting the ``css`` and/or ``js`` flags:

::

    [darkslide]
    ; the old [landslide] is still supported
    theme  = /path/to/my/beautiful/theme
    source = slides.mdown
    css =    custom.css
    js =     jquery.js
             powerpoint.js

These will link the ``custom.css`` stylesheet and both the ``jquery.js``
and ``powerpoint.js`` files within the ``<head>`` section of the
presentation html file.

**NOTE:** Paths to the css and js files must be relative to the
directory you're running the ``darkslide`` command from.

Publishing your Presentation Online
===================================

For online publishing use the ``--embed`` option to produce a standalone
HTML file with no dependencies::

    $ darkslide slides.md --embed

Theme Variables
===============

The ``base.html`` must be a `Jinja2 template
file <http://jinja.pocoo.org/2/documentation/templates>`__ where you can
harness the following template variables:

-  ``css``: the stylesheet contents, available via two keys, ``print``
   and ``screen``, both having:
-  a ``path_url`` key storing the url to the asset file path
-  a ``contents`` key storing the asset contents
-  ``js``: the javascript contents, having:
-  a ``path_url`` key storing the url to the asset file path
-  a ``contents`` key storing the asset contents
-  ``slides``: the slides list, each one having these properties:
-  ``header``: the slide title
-  ``content``: the slide contents
-  ``number``: the slide number
-  ``embed``: is the current document a standalone one?
-  ``num_slides``: the number of slides in current presentation
-  ``toc``: the Table of Contents, listing sections of the document.
   Each section has these properties available:
-  ``title``: the section title
-  ``number``: the slide number of the section
-  ``sub``: subsections, if any

Styles Scope
============

-  To change HTML5 presentation styles, tweak the ``css/screen.css``
   stylesheet bundled with the theme you are using
-  For printing, modify the ``css/print.css``

Authors
=======

The project was originally named Landslide and was authored by
Adam Zapletal (adamzap@gmail.com) and Nicolas Perriault (nperriault@gmail.com)

Slide code is based on html5-slides.

More details: https://github.com/ionelmc/python-darkslide/contributors

.. image:: https://dev.azure.com/pygobject/pgi-docgen/_apis/build/status/pygobject.pgi-docgen?branchName=master
    :target: https://dev.azure.com/pygobject/pgi-docgen/_build/latest?definitionId=2&branchName=master

.. image:: https://codecov.io/gh/pygobject/pgi-docgen/branch/master/graph/badge.svg
    :target: https://codecov.io/gh/pygobject/pgi-docgen

What is this?
=============

A tool to create sphinx documentation for gi modules using python
introspection.

``pgi-docgen create`` introspects the gi module, pulls in the gir docs and
creates a sphinx environment.

``pgi-docgen build`` builds html docs using sphinx.

Requirements
------------

* Python 3
* pgi (trunk)
* jinja2
* Sphinx
* BeautifulSoup4
* graphviz

Calling ``source ./tools/bootstrap.sh`` will put you in a
virtualenv with all dependencies installed (except graphviz).


How do I get started?
---------------------

::

    # API docs for Gtk/Gst:
    ./tools/build.sh Gtk-3.0 Gst-1.0

The resulting docs can be found in ``_docs/_build``


How do I build docs for private libraries?
------------------------------------------

The following creates docs for the in gnome-music included libgd::

    XDG_DATA_DIRS=$XDG_DATA_DIRS:/usr/share/gnome-music/ \
    GI_TYPELIB_PATH=/usr/lib/x86_64-linux-gnu/gnome-music/girepository-1.0/ \
    LD_LIBRARY_PATH=/usr/lib/x86_64-linux-gnu/gnome-music/ ./build.sh Gd-1.0


Intersphinx
-----------

There are two ways to reference the online API reference from sphinx
generated documentation:

1) Including the sidebar (needs JavaScript)

   ::

        intersphinx_mapping = {
            'gtk': ('http://lazka.github.io/pgi-docs/#Gtk-3.0/',
                    'http://lazka.github.io/pgi-docs/Gtk-3.0/objects.inv'),
        }

2) Without the sidebar

   ::

        intersphinx_mapping = {
            'gtk': ('http://lazka.github.io/pgi-docs/Gtk-3.0', None),
        }


Licenses
--------

Everything in the ``pgidocgen/gen/data/theme`` sub directory:

    https://github.com/rtfd/readthedocs.org

    MIT License

Fonts in ``pgidocgen/gen/data/theme/static/fonts``

    Lato:
        http://www.latofonts.com

        SIL Open Font License 1.1

    DejaVu Sans Mono:
        https://dejavu-fonts.github.io/

        Public Domain

    FontAwesome:
        http://fontawesome.io

        SIL OFL 1.1

``pgidocgen/gen/data/ext/devhelp_fork.py``

    https://bitbucket.org/birkenfeld/sphinx/

    BSD

``pgidocgen/gen/data/index/jquery-2.2.0.min.js``

    https://jquery.org/

    MIT License

``pgidocgen/gen/data/index/js.cookie-2.1.0.min.js``

    https://github.com/js-cookie/js-cookie

    MIT License

Everything else:

    GNU Lesser General Public License 2.1 or later

.. _reference_manual:

Weblog's reference manual
=========================

In this document *Weblog* is the name of the software. The *web log* concept is
referred as the more common term *blog*.

According to Wikipedia_:

  A *blog* (a portmanteau of *web log*) is a website where entries are written
  in chronological order and commonly displayed in reverse chronological order.

.. _Wikipedia: http://en.wikipedia.org/wiki/Blog

Setting the publication date
----------------------------

A good practice is to set the date when the post gets published. By doing
so the date won't get changed if the file gets copied or modified. To set the
date of a post, use the command ``date``::

  $ date
  Mon Apr 14 00:10:44 PDT 2008

  $ cat my_blog_post.html
  title: My blog post

  Some random content.

  $ weblog date my_blog_post.html
  Setting date to 2008-04-14 00:12:22 in file my_blog_post.html

  $ cat my_blog_post.html
  title: My blog post
  date: 2008-04-14 00:12:22

  Some random content.

  $ weblog date my_blog_post 2008-5-15
  Setting date to 2008-05-15 in file my_blog_post.html

  $ cat my_blog_post.html
  title: My blog post
  date: 2008-05-15

  This is a blog post without any date.

Without any argument the date is set the local time. Most of the time, you will
only need this command::

  $ weblog date path/to/my/post.txt

The ``date`` command accepts 3 formats as optional argument:

  - YEAR-MONTH-DAY (2008-01-31)
  - YEAR-MONTH-DAY HOUR:MINUTE (2008-01-31 16:45)
  - YEAR-MONTH-DAY HOUR:MINUTE:SECONDS (2008-01-31 16:45:14)

This way you can set a specific publication date for a post.

Writing a Post
--------------

Headers
~~~~~~~

Headers define everything that is not part of the post content:
They are standard :RFC:`2822` headers (the headers used in Emails). Only
``title`` is mandatory.

  - Title: ``title``
  - Author: ``author``
  - File's encoding: ``encoding`` (see Encoding_)
  - Files attached to the post: ``files`` (see `Attaching a file to a post`_)
  - Slug: ``slug`` (See `Post's URL`_)

A blank line must follow headers.

Content
~~~~~~~

After the headers comes the content of post. You can write posts using 2 syntaxes:

  - Raw HTML syntax
  - Markdown_

The type of the post is determined by the post's file extension.

  - `.html` for HTML
  - `.txt` for Markdown

.. _Markdown: http://en.wikipedia.org/wiki/Markdown

Post's URL
~~~~~~~~~~

The URL of a post is determined by its date and its Slug_. For example::

  title: test
  date: 2009-11-5

  Example

The URL will be http://.../2009/11/5/test.html. It is constructed this way::

  <Year>/<Month>/<Day>/<Slug>.html

`<Slug>` is a label given to the post. By default, it is determined from the
post's title, by replacing spaces with underscores. If the title is "Hello
World", the slug will be Hello_World. You can change a post's Slug_ via the
header `slug`::

  title: My fancy blog post
  date: 2009-11-1
  slug: fancy

  Example

Here the URL will be http://.../2009/11/1/fancy.html.

.. _Slug: http://en.wikipedia.org/wiki/Slug_%28production%29

Encoding and escaping
---------------------

Encoding
~~~~~~~~

Weblog applies `Postel's law`_:

  Be conservative in what you do; be liberal in what you accept from others.

It accepts files with different encoding as input but always output HTML
files using ASCII encoding, non-ASCII characters being converted to HTML
entities.

The Atom feed is always encoded in UTF-8.

You have 3 ways of specifying the input encoding:

  - The operation system's locale or system's encoding.

  - ``config.py``, via the field ``encoding``. This encoding becomes the
    default encoding for the post files and the configuration file
    ``config.py``. It overrides the system's encoding.

  - The post's header ``encoding``, example for UTF-8::

      encoding: UTF-8

    or latin-1::

      encoding: latin-1

    This override the encoding specified in ``config.py``.

To get a list of supported encodings check `Python's documentation
<http://docs.python.org/library/codecs.html#id3>`_

.. _Postel's law: http://en.wikipedia.org/wiki/Postel's_law

Escaping
~~~~~~~~

Weblog escapes strings to make sure everything displays smoothly. If you don't
know what escaping is, you can probably skip this section.

Everything is escaped except:

  - The content of a post if its syntax is HTML
  - HTML head, header, and footer

Which means the title ``Me & You`` is converted to ``Me &amp; you`` in HTML
and Atom files.

.. _attach_file:

Attaching a file to a post
--------------------------

To attach files like images to a blog post, use the field ``files``::

  title: Attach a file
  files: picture.png directory/file

  <img src='picture.png' alt='a picture'>
  <a href='directory/file'>a file</a>

It will copy ``picture.png`` and ``directory/file``. If ``directory`` does not
exist, it will be created.

You can specify multiple files like this::

  files: image1.png image2.png

Space characters act as the separators. This means that filenames cannot
contain spaces.

How URL's in content are handled
--------------------------------

Sometime, URL's have to be changed to make sure they point to the correct
location.

Relative links (``<a href='test.html'>``) are rewritten in HTML files to make
sure it always point to the root of the output directory.

Absolute links (``<a href='http://example.com'>``) are not rewritten. It always
point to the correct location regardless of the context.

Note that Weblog considers ``/`` as the root directory. If ``base_url`` is
``http://example.com/``; ``test.html`` and ``/test.html`` are both rewritten to
``http://example.com/test.html``.

.. _style:

Customizing Weblog's appearance
-------------------------------

To customize Weblog's appearance you need to change the templates used to
generate the pages. To learn how to modify the templates, check `Jinja 2`_
documentation, also a basic knowledge of HTML and CSS is needed.

You can find the templates in ``weblog/templates`` in your Weblog's
installation directory. Copy the files you want to modify into the
``templates`` directory inside of your source directory::

  $ mkdir source/directory/templates

  $ cp /path/to/weblog/templates/base.html source/directory/templates


``base.html`` is probably the file you want to modify to customize Weblog's
global appearance. All other templates extend it.

``index.html`` is the main page and ``archives.html`` is the archive page,
listing all the posts on your blog.

``post.html`` is used to generate individual post's page.

There is also a template named ``feed.atom`` you should not modify this one. It
is used to generate the Atom feed.

CSS and HTML resources
~~~~~~~~~~~~~~~~~~~~~~

CSS is hard. The CSS syntax tend to be confusing for beginners. The numerous
browser incompatibilities makes the designer's work even more complicated. Here
is a list of useful resources regarding this subject:

- SitePoint_ CSS Reference is very helpful. It lists all CSS properties and
  document how well they are supported by the different browsers.
- HtmlHelp_ contains a complete HTML 4 reference.

.. _Jinja 2: http://jinja.pocoo.org/2/documentation/
.. _HtmlHelp: http://htmlhelp.com/reference/html40/
.. _SitePoint: http://reference.sitepoint.com/css

Command line parameters
-----------------------

Usage: weblog [option] command

Commands:
  publish
  date

Options:
  -h, --help            show this help message and exit
  -s DIR, --source_dir=DIR
                        The source directory where the blog posts are located.
                        [default: '.']
  -o DIR, --output_dir=DIR
                        The directory where all the generated files are
                        written. If it does not exist it is created.[default:
                        'output']
  -c FILE, --conf=FILE  The configuration file to use. If the file is not
                        present in the current directory, the source directory
                        is searched. [default: 'config.py']
  -q, --quiet           Do not output anything except critical error messages

Configuration file
------------------

Weblog's configuration file is a Python script. If you don't know Python, don't
worry, the syntax is straightforward and you need very little knowledge to get
started with Weblog.

Example ``config.py``::

  title = "Blog's title"
  url = "http://example.com"
  description = "A sample blog"
  author = "Me <me@example.org>"
  encoding = "latin-1"
  post_per_page = 10

  source_dir = "path/to/my/posts"
  output_dir = "path/to/output/directory"

To learn more about Python's syntax read the `Python tutorial`_.

.. _Python tutorial: http://docs.python.org/tutorial/index.html

All fields are optionals except `url` which is needed to generate Atom feed
correctly. If the field is not present, you will just get a warning. This way
you can start using Weblog without even having a configuration file.


title
  The blog's title. It appears at the top of the homepage and in the page's
  title.

url
  The base URL of your blog. For example ``http://my-host.com/my-weblog/``. It
  is used to generate the absolute URL's to your blog.

  It should be present, otherwise Atom feed wont work correctly.

description
  A short description of your blog. Like My "favorite books reviews", or "Dr.
  Spock, publications about electronics".

source_dir
  The directory containing the post files and the ``templates`` directory. You
  can organize the files by creating subfolders in the source directory. Weblog
  visits and load files in all the subdirectories of ``source_dir``, execpt the
  one listed by ``ignore_dirs``.

  By default the current directory.

ignore_dirs
  A list of directories to ignore when visiting ``source_dir``. The directory
  `templates` is always ignored and therefor you don't need to add it to
  ``ignore_dirs``.

  By default empty.

output_dir
  The output directory. Generated files are put there. By default ``output``.

encoding
  The default post file's encoding. It is overridden by the ``encoding`` field
  in the post file.

  By default it is the operating system's encoding.

filesystem_encoding
  If you are using Microsoft or Mac OS X, you don't need to use this. If you
  are using an Unix based system, you might need to specify the filesystem's
  encoding to have proper filenames, for example if your operating system
  encoding is not the same as your filesystem.

  By default it is the operating system's encoding.

author
  The default author. It is overridden by the ``author`` field in the post file.
  It can contain an Email address::

    author = "An Example <an@example.org>"

post_per_page
  The number of post displayed on the listing page::

    post_per_page = 42

  Default is 10.

feed_limit
  The maximum number of posts to be included in the Feed file. Default is 10.

  Note: rss_limit has been renamed to feed_limit.

extra_files
  Additional files to be copied. Typically used to copy CSS style sheets and/or
  pictures. It is a list of string::

    extra_files = ("style.css", "logo.png")

  Files are copied into ``output_dir``. The path is not preserved:
  ``style/weblog.css`` gets copied into ``output_dir/weblog.css``; not into
  ``output_dir/style/weblog.css``. This behavior is likely to change in the
  future.

Tips on Uploading
-----------------

rsync_ is a useful tool to upload files generated by Weblog.

To make sure rsync does not change the last modification time of the files that
did not change, use the following::

  rsync --compress --checksum --recursive path/to/blog remote_host:public/dir/

Accurate modification time makes efficient caching possible.

.. _rsync: http://samba.anu.edu.au/rsync/

Need more help?
---------------

Don't hesitate to ask questions about Weblog:

  http://groups.google.com/group/weblog-users or weblog-users@googlegroups.com

To report a bug, request a feature:

  http://bitbucket.org/henry/weblog/issues/

.. vim:se tw=79 sw=2 ts=2 et:

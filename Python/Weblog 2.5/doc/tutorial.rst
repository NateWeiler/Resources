Tutorial
========

Weblog is a file system based Blog publisher. It works like a compiler. A
compiler reads source files from the disk and produces an executable; Weblog
reads structured text files and produces a Blog.

Here is a quick overview of what is possible to do with Weblog.

Create a Blog
-------------

Before writing your first blog post, you must setup Weblog.

Create a new directory which will contains all the files related to your Blog.
Let's call it ``my_blog``. Inside ``my_blog`` create a file ``config.py``
containing::

  title = 'My Blog'
  url = 'http://my_blog.example.com/'

Change the values of ``title`` and ``url`` to whatever you like.

You can already run Weblog from your blog's directory::

  $ cd my_blog/
  $ weblog publish

Alternatively you can specify your blog directory via the option ``-s``, for
example if the directory is in ``/path/to/``::

  $ weblog -s /path/to/my_blog/

This will create a new directory ``output`` containing an empty blog. Preview it
by opening the ``output/index.html`` with a browser.

You can also specify the name and the location of the output directory via the
``-o`` option::

  $ weblog -s /path/to/my_blog/ -o /tmp/weblog_output

First post
----------

Let's publish something now. Create a file named ``first_post.txt`` in your blog
directory containing::

  title: My first post

  This is my very first post using Weblog.

Re-run Weblog. Now the ``output/index.html`` page contains your new entry. You
will see the title `My first post`, and below it the publication date.

Post's structure
~~~~~~~~~~~~~~~~

The post file starts with a list of parameters. All the parameters are
optional, except ``title``::

  title: My first post

You can also specify the author by adding an ``author`` parameter::

  title: My first post
  author: Terry Scott

You can add the author's Email after the author's name; it will automatically
be recognised as an Email address, and the corresponding link will be added::

  author: Terry Scott <terry@scott.org>

After these parameters, there is a blank line, which separate the parameters
from the content. Don't forget it when composing!

Formatting post content
-----------------------

Let's add more content to the Blog. It is a little bit empty right now. Create a
second file ``second_post.txt``::

  title: A richer post

  This second post demonstrate the possibilities offered by Markdown, the
  markup language used in Weblog.

  Here is a second paragraph. *Emphased words*, and **Strong words**.

  - A list element
  - Another list element

  You can also quote text:

  > A silly quotation

  You can also have monospaced text, useful for code:

      print "Hello World"

Now you have a second entry in your blog. This entry has some fancy formatting
because the text above is using the Markdown_ syntax. Markdown_ markup is
automatically turned into HTML. This way you can write your blog posts without
learning HTML.

But you can also use HTML if you want to::

  title: HTML is available too

  <p>A paragraph</p>
  <ul>
    <li>A list item</li>
    <li>Antoher list item</li>
  </ul>
  <p><em>Emphased words</em>, and <strong>Strong words</strong>.</p>

Adding a picture
----------------

Create a directory named ``images`` in your blog's directory. That's where the
images will be stored. Copy a picture you would like to publish into
``images``. Let's call it ``weblog.png``.

``post_image.txt``::

  title: Posting an image
  files: images/weblog.png

  ![A random image](images/weblog.png)

The `files` parameter tells Weblog to copy `images/weblog.png` into the output
directory. Note that the path is preserved; the file is copied to
`output/images/weblog.png`. You can copy all kinds of files, not just images.

What next?
----------

To learn more about Weblog and how to use it check :ref:`reference_manual` and how
to customize its appearance check :ref:`style`.

.. _Markdown: http://daringfireball.net/projects/markdown/syntax#overview

.. vim:se tw=79 sw=2 ts=2 et:

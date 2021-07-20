#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
from optparse import OptionParser

from . import __version__
from . import generator


def parse_options():
    """Parses landslide's command line options"""

    parser = OptionParser(
        usage="%prog [options] input.md ...",
        description="Generates a HTML5 slideshow from Markdown or other formats.",
        version="%prog " + __version__)

    parser.add_option(
        "-b", "--debug",
        action="store_true",
        dest="debug",
        help="Will display any exception trace to stdout.",
        default=False)

    parser.add_option(
        "-d", "--destination",
        dest="destination_file",
        help="The path to the to the destination html file. Default: presentation.html.",
        metavar="FILE",
        default="presentation.html")

    parser.add_option(
        "-e", "--encoding",
        dest="encoding",
        help="The encoding of your files. Default: utf8.",
        metavar="ENCODING",
        default="utf8")

    parser.add_option(
        "-i", "--embed",
        action="store_true",
        dest="embed",
        help="Embed stylesheet and javascript contents, base64-encoded images and objects in presentation to make a "
             "standalone document.",
        default=False)

    parser.add_option(
        "-l", "--linenos",
        type="choice",
        choices=generator.VALID_LINENOS,
        dest="linenos",
        help="How to output linenos in source code. Three options available: "
             "no (no line numbers); "
             "inline (inside <pre> tag); "
             "table (lines numbers in another cell, copy-paste friendly).",
        default="inline",
    )

    parser.add_option(
        "-m", "--max-toc-level",
        type="int",
        dest="maxtoclevel",
        help="Limits the TOC level generation to a specific level.",
        default=2)

    parser.add_option(
        "-M", "--mod",
        dest="theme_mod",
        help="Specify a theme modifier by name. Available: wide_16x9.",
        default='')

    parser.add_option(
        "-o", "--direct-output",
        action="store_true",
        dest="direct",
        help="Prints the generated HTML code to stdout.",
        default=False)

    parser.add_option(
        "-P", "--no-presenter-notes",
        action="store_false",
        dest="presenter_notes",
        help="Don't include presenter notes in the output.",
        default=True)

    parser.add_option(
        "-q", "--quiet",
        action="store_false",
        dest="verbose",
        help="Won't write anything to stdout (silent mode).",
        default=False)

    parser.add_option(
        "-r", "--relative",
        action="store_true",
        dest="relative",
        help="Make your presentation asset links relative to current working dir; "
             "This may be useful if you intend to publish your html "
             "presentation online.",
        default=False,
    )

    parser.add_option(
        "-t", "--theme",
        dest="theme",
        help="A theme name, or path to a landlside theme directory",
        default='default')

    parser.add_option(
        "-v", "--verbose",
        action="store_true",
        dest="verbose",
        help="Write informational messages to stdout (enabled by default).",
        default=True)

    parser.add_option(
        "-x", "--extensions",
        dest="extensions",
        help="Comma-separated list of extensions for Markdown.",
        default='',
    )

    parser.add_option(
        "-w", "--watch",
        action="store_true",
        dest="watch",
        help="Watch source directory for changes and regenerate slides.",
        default=False
    )

    options, args = parser.parse_args()

    if not args:
        parser.print_help()
        sys.exit(1)

    return options, args[0]


def log(message, type):
    """Log notices to stdout and errors to stderr"""

    (sys.stdout if type == 'notice' else sys.stderr).write(message + "\n")


def run(input_file, options):
    """Runs the Generator using parsed options."""

    options.logger = log
    generator.Generator(input_file, **options.__dict__).execute()


def main():
    """Main program entry point"""

    options, input_file = parse_options()

    if options.debug:
        run(input_file, options)
    else:
        try:
            run(input_file, options)
        except Exception as e:
            sys.stderr.write("Error: %s\n" % e)
            sys.exit(1)

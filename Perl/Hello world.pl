#!/usr/bin/perl

use strict;
use warnings;

# Perl Hello World

# Perl statements end in a semi-colon:

print "Hello, world";

# Comments start with a hash symbol and run to the end of the line

# This is a comment and Whitespace is irrelevant:

print
    "Hello, world";

# ... except inside quoted strings:

# this would print with a linebreak in the middle

print "Hello
world";

# Double quotes or single quotes may be used around literal strings:

print "Hello, world";

print 'Hello, world';

# However, only double quotes "interpolate" variables and special characters such as newlines (\n):

print "Hello, $name\n";     # works fine

print 'Hello, $name\n';     # prints $name\n literally

# Numbers don't need quotes around them:

print 42;

# You can use parentheses for functions' arguments or omit them according to your personal taste. They are only required occasionally to clarify issues of precedence.

print("Hello, world\n");

print "Hello, world\n";

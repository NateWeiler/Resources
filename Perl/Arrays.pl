#!/usr/bin/perl
use strict;
use warnings;

# Arrays

# An array represents a list of values:

my @animals = ("camel", "llama", "owl");
my @numbers = (23, 42, 69);
my @mixed   = ("camel", 42, 1.23);

# Arrays are zero-indexed. Here's how you get at elements in an array:

print $animals[0];              # prints "camel"
print $animals[1];              # prints "llama"

# The special variable $#array tells you the index of the last element of an array:

print $mixed[$#mixed];       # last element, prints 1.23

# You might be tempted to use $#array + 1 to tell you how many items there are in an array. Don't bother. As it happens, using @array where Perl expects to find a scalar value ("in scalar context") will give you the number of elements in the array:

if (@animals < 5) { ... }

# The elements we're getting from the array start with a $ because we're getting just a single value out of the array; you ask for a scalar, you get a scalar.

# To get multiple values from an array:

@animals[0,1];                 # gives ("camel", "llama");
@animals[0..2];                # gives ("camel", "llama", "owl");
@animals[1..$#animals];        # gives all except the first element

# This is called an "array slice".

# You can do various useful things to lists:

my @sorted    = sort @animals;
my @backwards = reverse @numbers;

# There are a couple of special arrays too, such as @ARGV (the command line arguments to your script) and @_ (the arguments passed to a subroutine). These are documented in perlvar.

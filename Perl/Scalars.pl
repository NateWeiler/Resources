#!/usr/bin/perl
use strict;
use warnings;

# Scalars
# A scalar represents a single value:

my $animal = "camel";
my $answer = 42;

# Scalar values can be strings, integers or floating point numbers, and Perl will automatically convert between them as required. There is no need to pre-declare your variable types, but you have to declare them using the my keyword the first time you use them. (This is one of the requirements of use strict;.)

# Scalar values can be used in various ways:

print $animal;
print "The animal is $animal\n";
print "The square of $answer is ", $answer * $answer, "\n";

# There are a number of "magic" scalars with names that look like punctuation or line noise. These special variables are used for all kinds of purposes, and are documented in perlvar. The only one you need to know about for now is $_ which is the "default variable". It's used as the default argument to a number of functions in Perl, and it's set implicitly by certain looping constructs.

print;          # prints contents of $_ by default

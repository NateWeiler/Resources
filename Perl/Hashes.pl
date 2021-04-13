#!/usr/bin/perl
use strict;
use warnings;

# Hashes

# A hash represents a set of key/value pairs:

my %fruit_color = ("apple", "red", "banana", "yellow");

# You can use whitespace and the => operator to lay them out more nicely:

my %fruit_color = (
    apple  => "red",
    banana => "yellow",
);

# To get at hash elements:

$fruit_color{"apple"};           # gives "red"

# You can get at lists of keys and values with keys() and values().

my @fruits = keys %fruit_color;
my @colors = values %fruit_color;

# Hashes have no particular internal order, though you can sort the keys and loop through them.

# Just like special scalars and arrays, there are also special hashes. The most well known of these is %ENV which contains environment variables. Read all about it (and other special variables) in perlvar.

# Scalars, arrays and hashes are documented more fully in perldata.

# More complex data types can be constructed using references, which allow you to build lists and hashes within lists and hashes.

# A reference is a scalar value and can refer to any other Perl data type. So by storing a reference as the value of an array or hash element, you can easily create lists and hashes within lists and hashes. The following example shows a 2 level hash of hash structure using anonymous hash references.

my $variables = {
    scalar  =>  {
                 description => "single item",
                 sigil => '$',
                },
    array   =>  {
                 description => "ordered list of items",
                 sigil => '@',
                },
    hash    =>  {
                 description => "key/value pairs",
                 sigil => '%',
                },
};

print "Scalars begin with a $variables->{'scalar'}->{'sigil'}\n";

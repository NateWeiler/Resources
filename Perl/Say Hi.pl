#!/usr/bin/perl

use warnings;
use strict;

print &say_hi , "\n";
sub say_hi{
    my $name = 'Bob';
    print "Hi $name \n";
    $name;
}

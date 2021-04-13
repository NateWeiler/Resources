#!/usr/bin/perl
use strict;
use warnings;

# Files and I/O

# You can open a file for input or output using the open() function. It's documented in extravagant detail in perlfunc and perlopentut, but in short:

open(my $in,  "<",  "input.txt")  or die "Can't open input.txt: $!";
open(my $out, ">",  "output.txt") or die "Can't open output.txt: $!";
open(my $log, ">>", "my.log")     or die "Can't open my.log: $!";

# You can read from an open filehandle using the <> operator. In scalar context it reads a single line from the filehandle, and in list context it reads the whole file in, assigning each line to an element of the list:

my $line  = <$in>;
my @lines = <$in>;

# Reading in the whole file at one time is called slurping. It can be useful but it may be a memory hog. Most text file processing can be done a line at a time with Perl's looping constructs.

# The <> operator is most often seen in a while loop:

while (<$in>) {     # assigns each line in turn to $_
    print "Just read in this line: $_";
}

# We've already seen how to print to standard output using print(). However, print() can also take an optional first argument specifying which filehandle to print to:

print STDERR "This is your final warning.\n";
print $out $record;
print $log $logmessage;

# When you're done with your filehandles, you should close() them (though to be honest, Perl will clean up after you if you forget):

close $in or die "$in: $!";

#!/usr/bin/perl
use strict;
use warnings;

# Conditional and looping constructs

# Perl has most of the usual conditional and looping constructs. As of Perl 5.10, it even has a case/switch statement (spelled given/when). See "Switch Statements" in perlsyn for more details.

# The conditions can be any Perl expression. See the list of operators in the next section for information on comparison and boolean logic operators, which are commonly used in conditional statements.

if
if ( condition ) {
    ...
} elsif ( other condition ) {
    ...
} else {
    ...
}

# There's also a negated version of it:

unless ( condition ) {
    ...
}

# This is provided as a more readable version of if (!condition).

# Note that the braces are required in Perl, even if you've only got one line in the block. However, there is a clever way of making your one-line conditional blocks more English like:

# the traditional way
if ($zippy) {
    print "Yow!";
}

# the Perlish post-condition way
print "Yow!" if $zippy;
print "We have no bananas" unless $bananas;
while
while ( condition ) {
    ...
}

# There's also a negated version, for the same reason we have unless:

until ( condition ) {
    ...
}

# You can also use while in a post-condition:

print "LA LA LA\n" while 1;          # loops forever
for

# Exactly like C:

for ($i = 0; $i <= $max; $i++) {
    ...
}

# The C style for loop is rarely needed in Perl since Perl provides the more friendly list scanning foreach loop.

foreach
foreach (@array) {
    print "This element is $_\n";
}

print $list[$_] foreach 0 .. $max;

# you don't have to use the default $_ either...
foreach my $key (keys %hash) {
    print "The value of $key is $hash{$key}\n";
}

# The foreach keyword is actually a synonym for the for keyword. See "Foreach Loops" in perlsyn.

# For more detail on looping constructs (and some that weren't mentioned in this overview) see perlsyn.

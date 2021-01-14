#!/usr/bin/perl
use strict;
use warnings;

# Variable scoping

# Throughout the previous section all the examples have used the syntax:

my $var = "value";

# The my is actually not required; you could just use:

$var = "value";

# However, the above usage will create global variables throughout your program, which is bad programming practice. my creates lexically scoped variables instead. The variables are scoped to the block (i.e. a bunch of statements surrounded by curly-braces) in which they are defined.

my $x = "foo";
my $some_condition = 1;
if ($some_condition) {
    my $y = "bar";
    print $x;           # prints "foo"
    print $y;           # prints "bar"
}
print $x;               # prints "foo"
print $y;               # prints nothing; $y has fallen out of scope

# Using my in combination with a use strict; at the top of your Perl scripts means that the interpreter will pick up certain common programming errors. For instance, in the example above, the final print $y would cause a compile-time error and prevent you from running the program. Using strict is highly recommended.

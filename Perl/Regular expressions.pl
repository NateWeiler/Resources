#!/usr/bin/perl
use strict;
use warnings;

# Regular expressions

# Perl's regular expression support is both broad and deep, and is the subject of lengthy documentation in perlrequick, perlretut, and elsewhere. However, in short:

# Simple matching
if (/foo/)       { ... }  # true if $_ contains "foo"
if ($a =~ /foo/) { ... }  # true if $a contains "foo"

# The // matching operator is documented in perlop. It operates on $_ by default, or can be bound to another variable using the =~ binding operator (also documented in perlop).

# Simple substitution
s/foo/bar/;               # replaces foo with bar in $_
$a =~ s/foo/bar/;         # replaces foo with bar in $a
$a =~ s/foo/bar/g;        # replaces ALL INSTANCES of foo with bar
                          # in $a

# The s/// substitution operator is documented in perlop.

# More complex regular expressions

# You don't just have to match on fixed strings. In fact, you can match on just about anything you could dream of by using more complex regular expressions. These are documented at great length in perlre, but for the meantime, here's a quick cheat sheet:

.                   a single character
\s                  a whitespace character (space, tab, newline,
                    ...)
\S                  non-whitespace character
\d                  a digit (0-9)
\D                  a non-digit
\w                  a word character (a-z, A-Z, 0-9, _)
\W                  a non-word character
[aeiou]             matches a single character in the given set
[^aeiou]            matches a single character outside the given
                    set
(foo|bar|baz)       matches any of the alternatives specified

^                   start of string
$                   end of string

# Quantifiers can be used to specify how many of the previous thing you want to match on, where "thing" means either a literal character, one of the metacharacters listed above, or a group of characters or metacharacters in parentheses.

*                   zero or more of the previous thing
+                   one or more of the previous thing
?                   zero or one of the previous thing
{3}                 matches exactly 3 of the previous thing
{3,6}               matches between 3 and 6 of the previous thing
{3,}                matches 3 or more of the previous thing

# Some brief examples:

/^\d+/              string starts with one or more digits
/^$/                nothing in the string (start and end are
                    adjacent)
/(\d\s){3}/         three digits, each followed by a whitespace
                    character (eg "3 4 5 ")
/(a.)+/             matches a string in which every odd-numbered
                    letter is a (eg "abacadaf")

# This loop reads from STDIN, and prints non-blank lines:
while (<>) {
    next if /^$/;
    print;
}

# Parentheses for capturing

# As well as grouping, parentheses serve a second purpose. They can be used to capture the results of parts of the regexp match for later use. The results end up in $1, $2 and so on.

# a cheap and nasty way to break an email address up into parts

if ($email =~ /([^@]+)@(.+)/) {
    print "Username is $1\n";
    print "Hostname is $2\n";
}

# Other regexp features

# Perl regexps also support backreferences, lookaheads, and all kinds of other complex details. Read all about them in perlrequick, perlretut, and perlre.

#!/usr/bin/perl
use strict;
use warnings;

# Writing subroutines is easy:

sub logger {
   my $logmessage = shift;
   open my $logfile, ">>", "my.log" or die "Could not open my.log: $!";
   print $logfile $logmessage;
}

# Now we can use the subroutine just as any other built-in function:

logger("We have a logger subroutine!");

# What's that shift? Well, the arguments to a subroutine are available to us as a special array called @_ (see perlvar for more on that). The default argument to the shift function just happens to be @_. So my $logmessage = shift; shifts the first item off the list of arguments and assigns it to $logmessage.

# We can manipulate @_ in other ways too:

my ($logmessage, $priority) = @_;       # common
my $logmessage = $_[0];                 # uncommon, and ugly

# Subroutines can also return values:

sub square {
    my $num = shift;
    my $result = $num * $num;
    return $result;
}

# Then use it like:

$sq = square(8);

# For more information on writing subroutines, see https://perldoc.perl.org/perlsub

#!/usr/bin/perl -w record radio for later playback Uses trplayer
#--- a legacy command-line real-player that no longer works on
#modern Linux systems.
use strict;
use vars qw(%options);
use Getopt::Std;
getopts('c:d:l:o:', \%options);
die "Usage: $0 -c channel -d directory  -l duration -o output\n"
  unless (defined ($options{d})
          and defined($options{o})
          and defined ($options{c})
          and defined($options{l}));
chdir($options{d});
my $wav="$$.wav";
$options{o} .=".mp3" unless ($options{o} =~ m/\.mp$/);
$ENV{TERM}='dumb';
qx(vsound -t  -f $wav trplayer -t $options{l} $options{c});
qx(lame --quiet $wav $options{o});
unlink($wav);

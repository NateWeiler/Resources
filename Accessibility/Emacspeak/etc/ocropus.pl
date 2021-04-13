#!/usr/bin/perl -w
#$Id: ocr-client.pl 4047 2006-08-11 19:11:17Z tv.raman.tv $
#Description: Invoke ocropus client. Pipe result to stdout
#Usage: ocr-client.pl image-file
use strict;
use File::Temp qw(tempfile);
use File::Basename;

my $OCR = 'ocroscript';
my ($out, $output) = tempfile();
my $image =shift;
die "No image specified" unless defined ($image);
qx($OCR  recognize $image > $output 2>/dev/null);
open(OUT, "lynx -dump $output 2>/dev/null | cat -s |");
while (<OUT>) {
  print;
}
unlink $output;

#!/usr/bin/perl -w
#$Id$
#Description: Invoke ocrxtr client. Pipe result to stdout
#Usage: ocr-client.pl image-file [hostname]
use strict;
use File::Temp qw(tempfile);
use File::Basename;

#my $OCR = 'ocrxtr';
my $OCR = 'xtrclilite';
my $image =shift;
die "No image specified" unless defined ($image);
my $host =shift;
my ($name,$path,$suffix) = fileparse($image,"\.tiff");
my ($in, $input)  = tempfile(suffix=>'.tiff');
my ($out, $output) = tempfile(suffix=>'.txt');
$host ='localhost' unless defined ($host);
if ( $host =~ m/localhost/) {
  #qx($OCR -out_text_name $output $image 2>/dev/null);
  qx($OCR $image $output 2>/dev/null);
  open (OUT, "cat -s $output |");
  while ( <OUT>) {
    print;
  }
  unlink $output;
} else {
  qx(scp $image  $host:$input);
  #qx(ssh $host $OCR -out_text_name $output $input 2>&1 > /dev/null);
  qx(ssh $host $OCR  $input $output 2>&1 > /dev/null);
  open (OUT, "ssh $host cat -s $output |");
  while (<OUT>) {
    print;
  }
  qx(ssh $host rm $input $output);
}

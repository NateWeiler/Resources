#!/usr/bin/perl -I/home/phil/perl/cpan/DataTableText/lib/
#-------------------------------------------------------------------------------
# Authorizing a user
# Philip R Brenan at gmail dot com, Appa Apps Ltd Inc., 2020
#-------------------------------------------------------------------------------
use warnings FATAL => qw(all);
use strict;
use Carp;
use Data::Dump qw(dump);
use Data::Table::Text qw(:all);
use Test::More qw(no_plan);

my $id     = q(Iv1.215ddf204603e9a8);
my $secret = q(5ff73056297f4b9c002db415b7c71e75c8325412);


sub authorize
 {my $a = qx(curl https://github.com/login/oauth/authorize?client_id=$id);
  say STDERR $a;
 }

say STDERR authorize;
=pod

 <html><body>You are being <a href="https://github.com/login?client_id=Iv1.215ddf204603e9a8&amp;return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3DIv1.215ddf204603e9a8">redirected</a>.</body></html>

Note the &amp;  Displaying the returned link in a browser produces:

  GET /github/authCallBack?code=f6a955a8f79c1d461460&state= HTTP/1.1" 404 491 "-" "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0"
  188.81.220.144 - - [18/Jan/2020:19:12:41 +0000] "GET /favicon.ico HTTP/1.1" 404 490 "-" "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0"

User authorization callback URL was set in the App declaration to GitHub

=cut

# <html><body>You are being <a href="https://github.com/login?client_id=Iv1.215ddf204603e9a8&amp;return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3DIv1.215ddf204603e9a8">redirected</a>.</body></html>
# Note the &amp;
# Displays the sign on screen

 which yields: http://18.221.7.129/github/authCallBack?code=f6a955a8f79c1d461460&state=

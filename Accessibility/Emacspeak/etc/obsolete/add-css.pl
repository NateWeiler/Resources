#!/usr/bin/perl-w  -i 
my $css='
<link rel="http://www.w3.org/StyleSheets/Core/Modernist" type="text/css"> ';
my $logo=qq(
 <table summary="logo"><tr><td>
<a href="http://emacspeak.sf.net"><img width="150" height="216" src="emacspeak.jpg" alt= "EMACSPEAK --Complete Audio Desktop"></a> 
</td></tr></table>);
while ( <>) {
  s@<head>@<head>$css@igo;
s@<body>@<body>$logo@igo;
s/^\s*\@title.*$//;
s/^\s*\@kindex.*//;
print;
}

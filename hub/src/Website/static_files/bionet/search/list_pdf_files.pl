use strict;
use warnings;

use File::Find;

my $localdir = '../';
my $file = 'searchable_pdf_files.txt';
open(my $fh,'>',$file) or die "could not open file";

find(sub { print $fh $File::Find::name, "\n" if /\.pdf/ },$localdir);

close $fh;

use strict;
use warnings;

use File::Find;

my $localdir = '../';
my $file = 'searchable_files.txt';
open(my $fh,'>',$file) or die "could not open file";

find(sub { print $fh $File::Find::name, "\n" if /\.html/ },$localdir);

close $fh;

use strict;
use warnings;
use Mojo::JSON qw(decode_json encode_json);
use Data::Dumper;
use File::Find;

my $localdir = '../';
my $file     = 'searchable_pdf_files.txt';
my $pdfs     = "pdf_schema.json";
open( my $fh,  '>', $file ) or die "could not open file";
open( my $jfh, '>', $pdfs ) or die "could not open file";

print $jfh '{"data":[';

my @magazines =
  ( 'publication.json', 'mkm_magazine.json', 'tof_magazine.json' );
my $i = 0;
for ( my $index = 0 ; $index <= $#magazines ; $index++ ) {

    my $hfile = $magazines[$index];
    local ( $/, *FH );
    if ( open( FH, "<:encoding(UTF-8)", $hfile ) ) {
        my $hcontent = <FH>;
        my $decoded  = decode_json $hcontent;
        my @files    = @{ $decoded->{'data'} };

        foreach my $f (@files) {
          $i++;
            my $json_node = encode_json {
                title    => $f->{'title'},
                link     => $f->{'link'},
                category => $f->{'category'},
                size     => $f->{'size'}
            };
            print $fh "../" . $f->{'link'} . "\n";
            if ( $i == 1 ) {
                print $jfh "$json_node";
            }
            else {
                print $jfh ",\n$json_node";
            }
        }
    }
    # print $jfh ",";
}
close $fh;
print $jfh "]}";
close $jfh;

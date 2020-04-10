use strict;
use warnings;
use Mojo::DOM;
use Data::Dumper;
use String::Util ':all';
use Mojo::JSON qw(decode_json encode_json);
use File::Basename;

my $node =
  getJsonNode("../sites/default/files/pdf/tree_seed_qualitz_guide.pdf");
  if($node==0){}else{
    print $node->{'title'};
  }

sub getJsonNode {
    my ($filename) = @_;
    my $json_schema = 'pdf_schema.json';

    my $hfile = $json_schema;

    # print $hfile;
    local ( $/, *FH );
    if ( open( FH, "<:encoding(UTF-8)", $hfile ) ) {
        my $hcontent = <FH>;
        my $decoded  = decode_json $hcontent;
        my @files    = @{ $decoded->{'data'} };

        # print $decoded;

        foreach my $f (@files) {

            # print "../" . $f->{'link'} . "-->" . $filename . "\n";
            if ( lc( "../" . $f->{'link'} ) eq lc($filename) ) {
                return $f;
            }
        }
    }
    return 0;
}

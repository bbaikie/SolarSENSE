use strict;
use warnings;
use Mojo::DOM;
use String::Util ':all';
use Mojo::JSON qw(decode_json encode_json);
use File::Basename;
use File::stat;

my $publication_file = 'publication.json';

open( my $jfh, '>', $publication_file );
print $jfh '{"data":[';

my $hfile = "../publication.html";
local ( $/, *FH );
if ( open( FH, "<:encoding(UTF-8)", $hfile ) ) {
    my $hcontent = <FH>;
    my $dom      = Mojo::DOM->new;

    # print $hcontent;
    $dom->parse($hcontent);
    my $i = 0;
    for my $link ( $dom->find('li a')->each ) {

        my $str  = ".pdf";
        my $href = $link->{href};
        if ( $href =~ /\Q$str\E/ ) {

            # if file exits
            if ( -f "../$href" ) {
                $i++;
                my $title = $link->text();
                my $size  = stat( "../" . $href )->size / 1024;    #in kbs
                my $fsize = 0;
                if ( $size >= 1024 ) {
                    $size = $size / 1024;

                    #file is in mb size
                    $fsize = " mb";
                }
                else {
                    #file is in kb
                    $fsize = " kb";
                }
                my $json_node = encode_json {
                    title    => $title,
                    link     => $href,
                    category => "Publications",
                    size     => sprintf( "%.2f$fsize", $size )
                };
                if ( $i == 1 ) {
                    print $jfh "$json_node";
                }
                else {
                    print $jfh ",\n$json_node";
                }
            }

        }
    }

}
print $jfh "]}";
close $jfh;

use strict;
use warnings;
use Mojo::DOM;
use Data::Dumper;
use String::Util ':all';
use Mojo::JSON qw(decode_json encode_json);
use File::Basename;

my $filename    = 'searchable_files.txt';    #actual file = searchable_files.txt
my $json_file   = 'searchable_content.json';
my $json_schema = 'json_schema.json';        # tiles and categories of pdf files

# will result in searchable content that can be used to create an index
open( my $jfh, '>:encoding(UTF-8)', $json_file );
print $jfh '{"data":[';

if ( open( my $fh, '<:encoding(UTF-8)', $filename ) ) {
    my $i       = 0;
    my $is_last = 0;
  LINE: while ( my $row = <$fh> ) {
        chomp $row;
        my $hfile = $row;
        print "$hfile\n";
        local ( $/, *FH );
        if ( open( FH, "<:encoding(UTF-8)", $hfile ) ) {
            my $hcontent = <FH>;
            my $dom      = Mojo::DOM->new;
            $hcontent = content($hcontent);
            next LINE if !hascontent($hcontent);
            $dom->parse($hcontent);
            if ( hascontent( $dom->find('ul.links') ) ) {
                $dom->find('ul.links')->each( sub { $_->remove } );
            }
            my $bcontent =
              $dom->find('div.datasheet-content')->map('all_text')->join("\n");
            if ( hascontent($bcontent) ) {

                print("reading content with container \n");
                $i++;

                # here we check to see if we can categorize this content
                my $category = getCategory($hfile);

                # print "$category\n";
                # die;
                #title of the page
                my $title = $dom->find('title')->map('text')->join("\n");

                #print $title;
                my $t = $dom->find('div.pane-node-updated div.pane-content')
                  ->map('text')->join("\n");
                $dom->find('div.pane-node-updated div.pane-content')
                  ->each( sub { $_->remove } );

                #need to read the content
                #remove links;
                my $date_time;
                ($title) = ( split( /\|/, $title ) )[0];
                if ( hascontent($t) ) {
                    $date_time = $t;
                }
                else {
                    $date_time = "NA";
                }

                $bcontent =
                  $dom->find('div.datasheet-content')->map('all_text')
                  ->join("\n");

                #my $replace = "../";
                #my $find = '/home/ansel/Downloads/site/infonet-biovision.org/';
                #$find = quotemeta $find;
                #$hfile =~ s/$find/$replace/g;

                my $json_node =
                  createJsonNode( $i, crunch($title), crunch($bcontent),
                    crunch($date_time), $hfile, crunch($category) );
                if ( $i == 1 ) {
                    print $jfh "$json_node";
                }
                else {
                    print $jfh ",\n$json_node";
                }

            }
            else {
                #try to read the pdf file contents
                print("reading content from pdf\n");
                $bcontent =
                  $dom->find('div#page-container')->map('all_text')->join("\n");
                if ( hascontent($bcontent) ) {
                    $i++;
                    my ( $file, $dir, $ext ) = fileparse( $hfile, qr/\.[^.]*/ );
                    print("$dir$file.pdf\n");
                    my $node = getPdfNode("$dir$file.pdf");
                    if ( $node == 0 ) { }
                    else {
                        # print("node found \n\n");
                        my $category = "TOF and Publications";
                        my $title =
                          $node->{'title'} . " (" . $node->{'size'} . ")";
                        my $link      = "$dir$file.pdf";
                        my $date_time = "NA";
                        my $json_node =
                          createJsonNode( $i, crunch($title), crunch($bcontent),
                            crunch($date_time), $link, crunch($category) );
                        if ( $i == 1 ) {
                            print $jfh "$json_node";
                        }
                        else {
                            print $jfh ",\n$json_node";
                        }

                        # unlink $link or warn "Could not unlink $link: $!";
                    }
                }
            }
        }
        else {
            warn "could not open file $hfile";
        }
    }
}
else {
    warn "Could not open file '$filename' $!";
}
print $jfh "]}";
close $jfh;

sub createJsonNode {
    my ( $id, $title, $content, $date_time, $link, $category ) = @_;
    my $json = encode_json {
        id        => $id,
        title     => $title,
        content   => $content,
        date_time => $date_time,
        link      => $link,
        category  => $category
    };
    return $json;
}

sub getCategory {
    my ($filename) = @_;

    # my $string     = "../AnimalHealth/Beekeeping/index.html";
    my $needle = "../AnimalHealth/";

    my @categories = (
        "../AnimalHealth/",        '../HumanHealth/',
        "../EnvironmentalHealth/", "../PlantHealth/Crops/",
        "../PlantHealth/Pests/",   "../PlantHealth/",
        "../News/",                "../news_and_events/"
    );
    my @category_titles = (
        "AnimalHealth",        "HumanHealth",
        "EnvironmentalHealth", "PlantHealth:Crops",
        "PlantHealth:Pests",   "PlantHealth",
        "News",                "News"
    );
    for ( my $index = 0 ; $index <= $#categories ; $index++ ) {
        $needle = $categories[$index];

        if ( substr( $filename, 0, length($needle) ) eq $needle ) {
            return $category_titles[$index];
        }
    }
    return "NA";
}

sub getPdfNode {
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
            if ( lc( $f->{title} ) eq "download" ) {
                print "goccha";
                return 0;
            }

            # print "../" . $f->{'link'} . "-->" . $filename . "\n";
            if ( lc( "../" . $f->{'link'} ) eq lc($filename) ) {
                return $f;
            }
        }
    }
    return 0;
}

sub content {
    my ($content) = @_;
    my $dom       = Mojo::DOM->new;
    my $dcontent  = $dom->parse($content);
    if ( hascontent( $dcontent->at('aside') ) ) {
        return "";
    }
    else {
        if ( hascontent( $dcontent->at('ol.breadcrumb') ) ) {
            $dcontent->at('ol.breadcrumb')->replace("<p></p>");

        }
        if ( hascontent( $dcontent->at('div.phleftcol') ) ) {
            $dcontent->at('div.phleftcol')->replace("<p></p>");

        }
        if ( hascontent( $dcontent->at('div.ahcolumnleft') ) ) {
            $dcontent->at('div.ahcolumnleft')->replace("<p></p>");

        }

        return $dcontent;
    }
}

use strict;
use warnings;
use Mojo::DOM;
use Data::Dumper;
use String::Util ':all';

#
#script to clean html page,
#insert offline search submit function
#remove unwanted links that referenced online urls
#

my $filename = 'searchable_files.txt';

# my $json_file = 'c.json';

if ( open( my $fh, '<:encoding(UTF-8)', $filename ) ) {

  LINE: while ( my $row = <$fh> ) {
        chomp $row;
        my $hfile = $row;

        print "revising $hfile\n";
        local ( $/, *FH );
        if ( open( FH, "<:encoding(UTF-8)", $hfile ) ) {

            my $hcontent = <FH>;
            my $dom      = Mojo::DOM->new;
            $dom->parse($hcontent);
            next LINE
              if ( !hascontent( $dom->at('div.main-container.container') ) );
            $dom->find('form#apachesolr-panels-search-block')
              ->each( sub { $_->attr( {action => 'javascript:;' }) } );

          # $dom->at('form#apachesolr-panels-search-block')->replace($bcontent);
            $dom->find('a.lexicon-term')
              ->each( sub { $_->attr( { href => 'javascript:;' } ) } );
            $dom->find('ul.links')->each( sub { $_->parent->remove } );
            my $sscript = "";
            $sscript = $dom->at('script#offline-search');

            my $favicon = $dom->find('link')->[0];
            my $level   = "..";

            if ( hascontent($favicon) ) {
                my $favicon_href = $favicon->attr('href');

                # my $level        = "../";

                my $level_2 = "../../";

                if (
                    substr( $favicon_href, 0, length("../../../") ) eq
                    "../../../" )
                {
                    $level = "../../../";
                }
                elsif (
                    substr( $favicon_href, 0, length("../../") ) eq "../../" )
                {
                    $level = "../../";
                }
                elsif ( substr( $favicon_href, 0, length("../") ) eq "../" ) {
                    $level = "../";
                }
                else { $level = "" }

            }
            else {
                $level = "";
            }

            if ( !hascontent($sscript) ) {
                $dom->at('head')
                  ->append(
                    "<script id='offline-search' type='text/javascript' src='"
                      . $level
                      . "search/invokeOfflineSearch.js'></script>" );
            }
            else {
                $dom->find('script#offline-search')->each(
                    sub {
                        $_->replace(
"<script id='offline-search' type='text/javascript' src='"
                              . $level
                              . "search/invokeOfflineSearch.js'></script>" );
                    }
                );
            }

            if ( hascontent($favicon) ) {
                my $favicon_href = $favicon->attr('href');
                my $js_level     = jsLevel($favicon_href);

                my $url = '\/\/{s}.tile.openstreetmap.org\/{z}\/{x}\/{y}.png';
                my $local_url = $js_level . '\/tiles\/{z}\/{x}\/{y}.png';
                $dom =~ s/"maxZoom":12/"maxZoom":5/g;
                $dom =~ s/"zoomDefault":10/"zoomDefault":2/g;
                $dom =~ s/\Q$url\E/$local_url/g;
            }

            open( my $of, '>', $hfile );
            print $of crunch($dom);
            close $of;
        }

    }
}

sub jsLevel () {
    my ($favicon_href) = @_;
    my $level = "..";
    if ( substr( $favicon_href, 0, length("../../../") ) eq "../../../" ) {
        $level = "..\/..\/..";
    }
    elsif ( substr( $favicon_href, 0, length("../../") ) eq "../../" ) {
        $level = "..\/..";
    }
    elsif ( substr( $favicon_href, 0, length("../") ) eq "../" ) {
        $level = "..";
    }
    else { $level = "" }

    return $level;

}

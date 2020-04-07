
use strict;
use warnings;
use CAM::PDF;

my $pdf_file = "../file/62334/tof_sept_2017_for_web_final/index.pdf";

my $doc = CAM::PDF->new($pdf_file) || die "$CAM::PDF::errstr\n";
for my $pagenum (1 .. $doc->numPages()) {
   my $text = $doc->getPageContent($pagenum);
   print($text);
}

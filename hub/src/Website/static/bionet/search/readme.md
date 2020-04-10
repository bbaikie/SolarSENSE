## Environment
* Linux OS _debian_ or _ubuntu_
## Requirements
#### Linux programs
* Perl
* [Nodejs](https://nodejs.org/en/)
* Linux Bash
#### Modules
#### perl
* [perl cpan mojo::dom](http://mojolicious.org/perldoc/Mojo/DOM)
* [perl cpan String::Util](http://search.cpan.org/dist/String-Util-1.23/lib/String/Util.pm)
* [perl cpan Data::Dumper](https://perldoc.perl.org/Data/Dumper.html)
* [perl cpan Mojo::json](http://mojolicious.org/perldoc/Mojo/JSON)
* [perl downloadsmtiles.pl](http://search.cpan.org/~rotkraut/Geo-OSM-Tiles-0.02/downloadosmtiles.pl)
#### nodejs
* [lunrjs](http://lunrjs.com/)
#### javascript
* [lunrjs](https://lunrjs.com/)
* [pagination](http://pagination.js.org/)
* [lodash](https://lodash.com/)
#### bash
* [pdf2htmlEX](https://github.com/coolwanglu/pdf2htmlEX)
## Process
### Downloading Content
Using httrack to download the website. _it takes roughly 7 to 9 hours to download content on cloud server_
``` httrack www.infonet-biovision.org -O /home/site/ -WqQ%v -%F "" --robots=0 --depth=500 --sockets=32 --extended-parsing=1 ```
Copy search folder with custom scripts to run several tasks on the process as indicated below

1. List PDF Files
This is a two step process.
Step 1: List all publications from the publication pages. Run the commands as follows.. in order
``` perl tof_titles.pl ``` for TOF publications
``` perl mk_titles.pl ``` for mkulima publications
``` perl pub_titles.pl ``` for publications
from the search folder run script to list pdf files. This will create a file **_searchable_pdf_files.txt_**  and  **_pdf_schema.json_** (to store pdf titles and sizes) in the same folder.
``` > perl downloadable_pdf_files.pl ```

2. Convert pdf files to html files
Convert pdf files from the list genenated above **_seachable_pdf_files.txt_** to html files so that we can create a uniform index of the content from html. This is made possible by the **_pdf2htmlEX_** command_The pdf files will be in the same location as the pdf files.
``` > bash convert_pdf_to_html.sh ```

3. List HTML files
List all html files so that we can extract content from. This will generate a file **_searchable_files.txt_**. This is a list of html files that will be indexed including the already converted pdf files in **(2)** above.
``` > perl list_searchable_files.pl ```
**_Note: remove unwanted html files so that it reduces the amount of files we need to process from searchble_files.txt above_**

4. Extract text content for indexing
Using the file generated in **(3)** above we run a script
``` > perl extract_searchable_content.pl  ```
to generate an **_index source_** in a json schema below
```json
{
    title: "title of the content",
    content: "extracted text from the html pages",
    category: "categories of content",
    date_time: "the date and time of publishing",
    link:"link of the html page"
}
```
5. index extracted text content
using nodejs, create an index using lunrjs that will be searchable ``` > nodejs makeIndex.js```. This will create two files ``` searchIndex.js``` and ```searchStore.js``` which will be included in the search page as script elements. _note: Indexing could take more than 45 minutes because of the extensive pdf content that need to be indexed_
```html
  <script src="./searchIndex.js" type="text/javascript"></script>
  <script src="./searchStore.js"></script>
```
6. Replace searchbox
This script carries our several functions
* Go through all the html pages finding the original search box and hence replace it with a command that will be used to initiate a search based on user input.
* Black out all links to _terms and taxonomiy reference_ because they lead to 404 page
* find and replace all references to tiles and replace to local times for the maps
```> perl replace_search.pl```

7. Download offline tiles
Usind a perl program we were in a position to download offline maps from zoom level 0-5 and include it in place of the onlne map overlay. This are in the folder created as _tiles_ on the home directory.
```> downloadosmtiles.pl --lat=-90:90 --lon=-180:180 --zoom=0:5```

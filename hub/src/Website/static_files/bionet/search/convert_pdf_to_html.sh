#!/bin/bash
while IFS= read -r line; do
	echo "Processing $line"
	pdf2htmlEX $line --dest-dir $(dirname "$line") --process-nontext 0 --embed-external-font 0
done <searchable_pdf_files.txt

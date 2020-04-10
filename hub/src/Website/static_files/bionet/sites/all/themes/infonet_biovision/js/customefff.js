// remove links from Lexicon tems
// $(".lexicon-term").attr("href","");

function modify_lexicon() {
  var lexicon_selector = document.querySelectorAll(".lexicon-term");

  for (var i = 0, len = lexicon_selector.length; i < len; i++) {
    lexicon_selector[i].setAttribute("href","");
  }
}

window.onload = modify_lexicon;


/*TOF Keywords*/

//custom javascript to create columns on TOF keywords page
(function ($) {
    $(document).ready(function(){
		
  		// add description text before the search facet in search page
  		var facet_desc = '<div id="facet-desc"><p>Use advanced search to narrow down your search results. You can filter your search by selecting the category checkboxes below. Furthermore, the search works for single or several search words.</p></div>';
  		$(facet_desc).insertBefore( '#block-facetapi-2uznqclfgsiwqdeuznh5mhvajjoszeq3' );

  		// add description text before the block for search results
  		var search_desc = '<div class="search-description"><ul><li>Check if your spelling is correct, or try removing filters.</li><li>Remove quotes around phrases to match each word individually: "blue drop" will match less than blue drop.</li><li>You can require or exclude terms using + and -: big +blue drop will require a match on blue while big blue -drop will exclude results that contain drop.</li></ul></div>';
  		
  		$(search_desc).insertBefore( 'body.page-search-site #block-system-main .spelling-suggestions' );

      // remove links from Lexicon tems
      // $(".lexicon-term").attr("href","");
      // var lexicon_selector = document.querySelectorAll(".lexicon-term");

      // for (var i = 0, len = lexicon_selector.length; i < len; i++) {
      //   lexicon_selector[i].setAttribute("href","");
      // }

      // hide titles on maize seeds and potato seeds pages
      $('body.page-node-28293 #simple-table-of-contents li:nth-child(8) .simple-table-of-contents-label').html('5.');
  		$('body.page-node-28308 #simple-table-of-contents li:nth-child(8) .simple-table-of-contents-label').html('5.');
  		
  		// add class for printer friendly button
  		// $("#block-system-main .panels-flexible-region-plant_health_layout_-center-inside").wrap("<div class='print-only'></div>");
  		$("#block-system-main .panels-flexible-column-plant_health_layout_-main").wrap("<div class='print-only'></div>");

    	// set attribute to TOF keyword field
    	$('#edit-field-keywords-und').attr('size','200')

    	// darken image on home page teasers
    	$('.home-teasers-div .file-image .content').hover(function() {
  	    $(this).find('img').fadeTo(500, 0.5);
  		}, function() {
  		    $(this).find('img').fadeTo(500, 1);
  		});

  		$('.home-teasers-div .views-field .field-content').hover(function() {
  		    $(this).find('img').fadeTo(500, 0.5);
  		}, function() {
  		    $(this).find('img').fadeTo(500, 1);
  		});

  		$('.home-teasers-div .views-field-field-featured-image-hh .field-content').hover(function() {
  		    $(this).find('img').fadeTo(500, 0.5);
  		}, function() {
  		    $(this).find('img').fadeTo(500, 1);
  		});

  		$('.home-teasers-div .views-field-field-ahgc-featured-file .field-content').hover(function() {
  		    $(this).find('img').fadeTo(500, 0.5);
  		}, function() {
  		    $(this).find('img').fadeTo(500, 1);
  		});

			// show active link of based on current page
  		$('.tof-menu-list .paragraph a').each(function() {
  			if($(this).prop('href') == window.location.href) {
    				$(this).addClass('current-tof');
  			}
			});  

			// add class
			// $('.view-tof-magazine-by-keywords .view-content').addClass('row');

  		// TOF Page
			var num_cols = 4,
			container = $('.view-tof-magazine-by-keywords .view-content'),
			listItem = '.tmk-accordion',
			listClass = 'column-wrap';

			container.each(function() {
			    var items_per_col = new Array(),
			    items = $(this).find(listItem),
			    min_items_per_col = Math.floor(items.length / num_cols),
			    difference = items.length - (min_items_per_col * num_cols);
			    for (var i = 0; i < num_cols; i++) {
			        if (i < difference) {
			            items_per_col[i] = min_items_per_col + 1;
			        } else {
			            items_per_col[i] = min_items_per_col;
			        }
			    }
			    for (var i = 0; i < num_cols; i++) {
			        $(this).append($('<div></div>').addClass(listClass));
			        for (var j = 0; j < items_per_col[i]; j++) {
			            var pointer = 0;
			            for (var k = 0; k < i; k++) {
			                pointer += items_per_col[k];
			            }
			            $(this).find('.' + listClass).last().append(items[j + pointer]);
			        }
			    }
			});

			// Publications Page
			pub_num_cols = 2,
			pub_container = $('.view-publications-keywords .ui-accordion'),
			pub_listItem = '.tmk-accordion',
			pub_listClass = 'pub-column-wrap';

			pub_container.each(function() {
			    var items_per_col = new Array(),
			    items = $(this).find(pub_listItem),
			    min_items_per_col = Math.floor(items.length / pub_num_cols),
			    difference = items.length - (min_items_per_col * pub_num_cols);
			    for (var i = 0; i < pub_num_cols; i++) {
			        if (i < difference) {
			            items_per_col[i] = min_items_per_col + 1;
			        } else {
			            items_per_col[i] = min_items_per_col;
			        }
			    }
			    for (var i = 0; i < pub_num_cols; i++) {
			        $(this).append($('<div></div>').addClass(pub_listClass));
			        for (var j = 0; j < items_per_col[i]; j++) {
			            var pointer = 0;
			            for (var k = 0; k < i; k++) {
			                pointer += items_per_col[k];
			            }
			            $(this).find('.' + pub_listClass).last().append(items[j + pointer]);
			        }
			    }
			});

			// Publications Page
			var pub_num_cols = 2,
			pub_container = $('.view-publication-keywords.view-content'),
			pub_listItem = '.pub-accordion',
			pub_listClass = 'column-wrap';

			pub_container.each(function() {
			    var items_per_col = new Array(),
			    items = $(this).find(pub_listItem),
			    min_items_per_col = Math.floor(items.length / pub_num_cols),
			    difference = items.length - (min_items_per_col * pub_num_cols);
			    for (var i = 0; i < pub_num_cols; i++) {
			        if (i < difference) {
			            items_per_col[i] = min_items_per_col + 1;
			        } else {
			            items_per_col[i] = min_items_per_col;
			        }
			    }
			    for (var i = 0; i < pub_num_cols; i++) {
			        $(this).append($('<div></div>').addClass(pub_listClass));
			        for (var j = 0; j < items_per_col[i]; j++) {
			            var pointer = 0;
			            for (var k = 0; k < i; k++) {
			                pointer += items_per_col[k];
			            }
			            $(this).find('.' + pub_listClass).last().append(items[j + pointer]);
			        }
			    }
			});

			//------OPEN PANEL-----
			/*
			This Function opens an accordion panel based on the URL
			*/

			//get path name from URL
			var pathName = window.location.pathname;

      // get last segment from url and replace .html
      var newPath = pathName.substr(pathName.lastIndexOf('/') + 0).replace(".html","");

      // initiate variable to store active panel value
      var active_panel;


			// Using the jQuery library
			//$('.results').html(pathName);

			switch(newPath) {
				case "/healthy_food":
					active_panel = 0;
					break;
				case "/nutrition_related_diseases":
					active_panel = 1;
					break;
				case "/insect_transmitted_diseases":
					active_panel = 2;
					break;
				case "/zoonotic_diseases":
					active_panel = 3;
					break;
				case "/hygiene_and_sanitation":
					active_panel = 4;
					break;
				case "/animal_husbandry_and_welfare":
					active_panel = 0;
					break;
				case "/livestock_species":
					active_panel = 1;
					break;
				case "/livestock_health_and_disease":
					active_panel = 2;
					break;
				case "/fodder_production":
					active_panel = 3;
					break;
				case "/ah_products":
					active_panel = 4;
					break;
				case "/crops-fruits-veg":
					active_panel = 0;
					break;
        case "/indigenous-vegetables":
          active_panel = 1;
          break;
				case "/plant_pests":
					active_panel = 2;
					break;
				case "/medicinal_plants":
					active_panel = 3;
					break;
				case "/fruit_veg_processing":
					active_panel = 4;
					break;
				case "/natural_pest_control":
					active_panel = 5;
					break;
				case "/cultural_practices":
					active_panel = 6;
					break;
				case "/agro_ecologic_zones":
					active_panel = 0;
					break;
				case "/water_management":
					active_panel = 1;
					break;
				case "/soil_management":
					active_panel = 2;
					break;
				case "/sustainable_organic_agriculture":
					active_panel = 3;
					break;
				case "/conservation_agriculture":
					active_panel = 4;
					break;
				case "/agroforestry":
					active_panel = 5;
					break;
				case "/eh_trees":
					active_panel = 6;
					break;
				case "/processing_and_value_addition":
					active_panel = 7;
					break;		
			}
			
			// accordion for chapter overview sidebar
			$(".not-front .region-sidebar-second").accordion({
				collapsible: true,
				header: "h2",
				active: active_panel,
				animated: false,
				heightStyle: "content",
				icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" }
			});

			$(".region-sidebar-second h2 a").click(function() {
      			window.location = $(this).attr('href');
      			return false;
   		});



		  // var host_name = window.location.hostname;
		  var json_file_link = "/sites/all/themes/infonet_biovision/js/links.json";


      // Global variables
      var jsonData = [
      {
        "id": 1,
        "title": "The water cycle and rain information",
        "link": "/EnvironmentalHealth/water-cycle-and-rain-information",
        "primary_category": "Environment Health",
        "secondary_category": "Water Management"
      },
      {
        "id": 2,
        "title": "Rain Water Harvesting",
        "link": "/EnvironmentalHealth/Rainwater-Harvesting",
        "primary_category": "Environment Health",
        "secondary_category": "Water Management"
      },
      {
        "id": 3,
        "title": "Shallow Ground Water",
        "link": "/EnvironmentalHealth/Shallow-ground-water",
        "primary_category": "Environment Health",
        "secondary_category": "Water Management"
      },
      {
        "id": 4,
        "title": "Surface Water",
        "link": "/EnvironmentalHealth/Surface-water",
        "primary_category": "Environment Health",
        "secondary_category": "Water Management"
      },
      {
        "id": 5,
        "title": "Water for Domestic Use",
        "link": "/EnvironmentalHealth/Water-domestic-use",
        "primary_category": "Environment Health",
        "secondary_category": "Water Management"
      },
      {
        "id": 6,
        "title": "Seeking funds for water projects",
        "link": "/EnvironmentalHealth/Seeking-funds-water-projects",
        "primary_category": "Environment Health",
        "secondary_category": "Water Management"
      },
      {
        "id": 7,
        "title": "Community Management of water sources",
        "link": "/EnvironmentalHealth/Community-management-water-sources",
        "primary_category": "Environment Health",
        "secondary_category": "Water Management"
      },
      {
        "id": 8,
        "title": "Water storage",
        "link": "/EnvironmentalHealth/Water-storage",
        "primary_category": "Environment Health",
        "secondary_category": "Water Management"
      },
      {
        "id": 9,
        "title": "Surveys, designs and permits for water projects",
        "link": "/EnvironmentalHealth/Surveys-designs-and-permits-water-projects",
        "primary_category": "Environment Health",
        "secondary_category": "Water Management"
      },
      {
        "id": 10,
        "title": "Construction of water projects",
        "link": "/EnvironmentalHealth/Construction-water-projects",
        "primary_category": "Environment Health",
        "secondary_category": "Water Management"
      },
      {
        "id": 11,
        "title": "Water as a business",
        "link": "/EnvironmentalHealth/Water-business-0",
        "primary_category": "Environment Health",
        "secondary_category": "Water Management"
      },
      {
        "id": 12,
        "title": "Water for Irrigation",
        "link": "/EnvironmentalHealth/Water-irrigation",
        "primary_category": "Environment Health",
        "secondary_category": "Water Management"
      },
      {
        "id": 13,
        "title": "AEZS: The FAO System",
        "link": "/EnvironmentalHealth/AEZs-FAO-System",
        "primary_category": "Environment Health",
        "secondary_category": "Agro Ecological Zone"
      },
      {
        "id": 14,
        "title": "AEZS: The Kenya System",
        "link": "/EnvironmentalHealth/AEZs-Kenya-System",
        "primary_category": "Environment Health",
        "secondary_category": "Agro Ecological Zone"
      },
      {
        "id": 15,
        "title": "Introduction to soil degradation",
        "link": "/EnvironmentalHealth/Introduction-soil-degradation",
        "primary_category": "Environment Health",
        "secondary_category": "Soil Management"
      },
      {
        "id": 16,
        "title": "Introduction to soil conservation measures",
        "link": "/EnvironmentalHealth/Introduction-soil-conservation-measures",
        "primary_category": "Environment Health",
        "secondary_category": "Soil Management"
      },
      {
        "id": 17,
        "title": "How to improve soil fertility",
        "link": "/EnvironmentalHealth/How-improve-soil-fertility",
        "primary_category": "Environment Health",
        "secondary_category": "Soil Management"
      },
      {
        "id": 18,
        "title": "Kenyan Soils",
        "link": "/EnvironmentalHealth/Kenyan-Soils",
        "primary_category": "Environment Health",
        "secondary_category": "Soil Management"
      },
      {
        "id": 19,
        "title": "Soil monitoring - Know your soil",
        "link": "/EnvironmentalHealth/Soil-monitoring-Know-your-soil",
        "primary_category": "Environment Health",
        "secondary_category": "Soil Management"
      },
      {
        "id": 20,
        "title": "Organic agriculture",
        "link": "/EnvironmentalHealth/What-Organic-Agriculture",
        "primary_category": "Environment Health",
        "secondary_category": "Sustainable & Organic Agriculture"
      },
      {
        "id": 21,
        "title": "Conservation agriculture",
        "link": "/EnvironmentalHealth/Conservation-agriculture",
        "primary_category": "Environment Health",
        "secondary_category": "Conservation Agriculture"
      },
      {
        "id": 22,
        "title": "Soil cover",
        "link": "/EnvironmentalHealth/Soil-cover",
        "primary_category": "Environment Health",
        "secondary_category": "Conservation Agriculture"
      },
      {
        "id": 23,
        "title": "Conservation tillage systems",
        "link": "/EnvironmentalHealth/Conservation-tillage-systems",
        "primary_category": "Environment Health",
        "secondary_category": "Conservation Agriculture"
      },
      {
        "id": 24,
        "title": "Mixed cropping and Crop rotation",
        "link": "/EnvironmentalHealth/Mixed-cropping-and-Crop-rotation",
        "primary_category": "Environment Health",
        "secondary_category": "Conservation Agriculture"
      },
      {
        "id": 25,
        "title": "Agroforestry",
        "link": "/EnvironmentalHealth/Agroforestry",
        "primary_category": "Environment Health",
        "secondary_category": "Agroforestry"
      },
      {
        "id": 26,
        "title": "A guide to tree planting in Kenya",
        "link": "/EnvironmentalHealth/guide-tree-planting-Kenya",
        "primary_category": "Environment Health",
        "secondary_category": "Agroforestry"
      },
      {
        "id": 27,
        "title": "Premises for food value addition",
        "link": "/EnvironmentalHealth/Premises-food-value-addition",
        "primary_category": "Environment Health",
        "secondary_category": "Processing & Value Addition"
      },
      {
        "id": 28,
        "title": "Machinery and Utensils - Where to get",
        "link": "/EnvironmentalHealth/Machinery-and-Utensils-Where-get",
        "primary_category": "Environment Health",
        "secondary_category": "Processing & Value Addition"
      },
      {
        "id": 29,
        "title": "Basic Export Requirements (Fruit,Vegetable) in Kenya",
        "link": "/EnvironmentalHealth/Basic-Export-Requirements-FruitVegetable-Kenya",
        "primary_category": "Environment Health",
        "secondary_category": "Processing & Value Addition"
      },
      {
        "id": 30,
        "title": "Prepacking fruits and vegetables",
        "link": "/EnvironmentalHealth/Prepacking-fruits-and-vegetables",
        "primary_category": "Environment Health",
        "secondary_category": "Processing & Value Addition"
      },
      {
        "id": 31,
        "title": "Jams and Preserves",
        "link": "/EnvironmentalHealth/Jams-and-Preserves",
        "primary_category": "Environment Health",
        "secondary_category": "Processing & Value Addition"
      },
      {
        "id": 32,
        "title": "Juice making",
        "link": "/EnvironmentalHealth/Juice-making",
        "primary_category": "Environment Health",
        "secondary_category": "Processing & Value Addition"
      },
      {
        "id": 33,
        "title": "Labels and Barcodes",
        "link": "/EnvironmentalHealth/Labels-and-Barcodes",
        "primary_category": "Environment Health",
        "secondary_category": "Processing & Value Addition"
      },
      {
        "id": 34,
        "title": "Acacia albida",
        "link": "/EnvironmentalHealth/Trees/Acacia-albida",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 35,
        "title": "African ironwood",
        "link": "/EnvironmentalHealth/Trees/African-ironwood",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 36,
        "title": "Avocado pear",
        "link": "/EnvironmentalHealth/Trees/Avocado-pear",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 37,
        "title": "Bamboo",
        "link": "/EnvironmentalHealth/Trees/Bamboo",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 38,
        "title": "Baobab",
        "link": "/EnvironmentalHealth/Trees/Baobab",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 39,
        "title": "Black wattle",
        "link": "/EnvironmentalHealth/Trees/Black-wattle",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 40,
        "title": "Blue Gum",
        "link": "/EnvironmentalHealth/Trees/Blue-Gum",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 41,
        "title": "Broad-leaved croton",
        "link": "/EnvironmentalHealth/Trees/Broad-leaved-croton",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 42,
        "title": "Brown olive",
        "link": "/EnvironmentalHealth/Trees/Brown-olive",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 43,
        "title": "Calliandra",
        "link": "/EnvironmentalHealth/Trees/Calliandra",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 44,
        "title": "Camphor",
        "link": "/EnvironmentalHealth/Trees/Camphor",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 45,
        "title": "Chilean mesquite",
        "link": "/EnvironmentalHealth/Trees/Chilean-mesquite",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 46,
        "title": "Coconut palm",
        "link": "/EnvironmentalHealth/Trees/Coconut-palm",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 47,
        "title": "Croton",
        "link": "/EnvironmentalHealth/Trees/Croton",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 48,
        "title": "Cyphomandra betacea_",
        "link": "/EnvironmentalHealth/Trees/Cyphomandra-betacea-Tree-tomato",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 49,
        "title": "Doum palm",
        "link": "/EnvironmentalHealth/Trees/Doum-palm",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 50,
        "title": "East African Greenheart",
        "link": "/EnvironmentalHealth/Trees/East-African-Greenheart",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 51,
        "title": "Falcon's claw",
        "link": "/EnvironmentalHealth/Trees/Falcons-claw",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 52,
        "title": "Fever tree",
        "link": "/EnvironmentalHealth/Trees/Fever-tree-Naivasha-thorn-tree",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 53,
        "title": "Finger euphorbia",
        "link": "/EnvironmentalHealth/Trees/Finger-euphorbia",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 54,
        "title": "Grey-leaved cordia",
        "link": "/EnvironmentalHealth/Trees/Grey-leaved-cordia",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 55,
        "title": "Gum Arabic tree",
        "link": "/EnvironmentalHealth/Trees/Gum-Arabic-tree",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 56,
        "title": "Honey Acacia",
        "link": "/EnvironmentalHealth/Trees/Honey-Acacia",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 57,
        "title": "Jackfruit",
        "link": "/EnvironmentalHealth/Trees/Jackfruit",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 58,
        "title": "Jatropha curcas",
        "link": "/EnvironmentalHealth/Trees/Jatropha-curcas",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 59,
        "title": "Lead tree",
        "link": "/EnvironmentalHealth/Trees/Lead-tree",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 60,
        "title": "Mango",
        "link": "/EnvironmentalHealth/Trees/Mango",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 61,
        "title": "Moringa / Cordia Abyssinica",
        "link": "/EnvironmentalHealth/Trees/Moringa-Cordia-Abyssinica",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 62,
        "title": "Melia volkensii",
        "link": "/EnvironmentalHealth/Trees/Melia-volkensii",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 63,
        "title": "Mexican cypress",
        "link": "/EnvironmentalHealth/Trees/Mexican-cypress",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 64,
        "title": "Mexican sunflower /Tree marigold",
        "link": "/EnvironmentalHealth/Trees/Mexican-sunflower-Tree-marigold",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 65,
        "title": "Mexican weeping pine",
        "link": "/EnvironmentalHealth/Trees/Mexican-weeping-pine",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 66,
        "title": "Moringa / Cordia Abyssinica",
        "link": "/EnvironmentalHealth/Trees/Moringa-Cordia-Abyssinica",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 67,
        "title": "Moringa / Moringa oleifera",
        "link": "/EnvironmentalHealth/Trees/Moringa-Moringa-oleifera",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 68,
        "title": "Mother of cocoa",
        "link": "/EnvironmentalHealth/Trees/Mother-cocoa",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 69,
        "title": "Mulberry",
        "link": "/EnvironmentalHealth/Trees/Mulberry",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 70,
        "title": "Mvule / Iroko",
        "link": "/EnvironmentalHealth/Trees/Mvule-Iroko",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 71,
        "title": "Nandi flame",
        "link": "/EnvironmentalHealth/Trees/Nandi-flame",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 72,
        "title": "Neem tree",
        "link": "/EnvironmentalHealth/Trees/Neem-tree",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 73,
        "title": "Nile tulip tree",
        "link": "/EnvironmentalHealth/Trees/Nile-tulip-tree",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 74,
        "title": "Parasol tree",
        "link": "/EnvironmentalHealth/Trees/Parasol-tree",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 75,
        "title": "Pawpaw",
        "link": "/EnvironmentalHealth/Trees/Pawpaw",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 76,
        "title": "Pepper tree",
        "link": "/EnvironmentalHealth/Trees/Pepper-tree",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 77,
        "title": "Prunus africana",
        "link": "/EnvironmentalHealth/Trees/Prunus-africana",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 78,
        "title": "River Red Gum",
        "link": "/EnvironmentalHealth/Trees/River-Red-Gum",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 79,
        "title": "Sausage tree",
        "link": "/EnvironmentalHealth/Trees/Sausage-tree",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 80,
        "title": "Sesbania sesban",
        "link": "/EnvironmentalHealth/Trees/Sesbania-sesban",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 81,
        "title": "Silky-oak",
        "link": "/EnvironmentalHealth/Trees/Silky-oak",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 82,
        "title": "Soap berry tree",
        "link": "/EnvironmentalHealth/Trees/Soap-berry-tree",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 83,
        "title": "Sycamore fig",
        "link": "/EnvironmentalHealth/Trees/Sycamore-fig",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 84,
        "title": "Tamarind",
        "link": "/node/9258",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 85,
        "title": "Toothbrush tree",
        "link": "/EnvironmentalHealth/Trees/Toothbrush-tree",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 86,
        "title": "Umbrella thorn acacia",
        "link": "/EnvironmentalHealth/Trees/Umbrella-thorn-acacia",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 87,
        "title": "Umbrella-tree",
        "link": "/EnvironmentalHealth/Trees/Umbrella-tree",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 88,
        "title": "Whispering pine",
        "link": "/EnvironmentalHealth/Trees/Whispering-pine",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 89,
        "title": "White-thorn acacia",
        "link": "/EnvironmentalHealth/Trees/White-thorn-acacia",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 90,
        "title": "Wild date palm",
        "link": "/EnvironmentalHealth/Trees/Wild-date-palm",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      },
      {
        "id": 91,
        "title": "Introduction into Nutrition",
        "link": "/HumanHealth/Introduction-Nutrition-0",
        "primary_category": "Human Health",
        "secondary_category": "Healthy Food"
      },
      {
        "id": 92,
        "title": "Micronutrients",
        "link": "/HumanHealth/Micronutrients",
        "primary_category": "Human Health",
        "secondary_category": "Healthy Food"
      },
      {
        "id": 93,
        "title": "Nutrition in the Elderly",
        "link": "/HumanHealth/Nutrition-Elderly",
        "primary_category": "Human Health",
        "secondary_category": "Healthy Food"
      },
      {
        "id": 94,
        "title": "Your Digestive System and how it works",
        "link": "/HumanHealth/Your-Digestive-System-and-how-it-works",
        "primary_category": "Human Health",
        "secondary_category": "Healthy Food"
      },
      {
        "id": 95,
        "title": "Minerals",
        "link": "/HumanHealth/Minerals",
        "primary_category": "Human Health",
        "secondary_category": "Healthy Food"
      },
      {
        "id": 96,
        "title": "Proteins",
        "link": "/HumanHealth/Proteins",
        "primary_category": "Human Health",
        "secondary_category": "Healthy Food"
      },
      {
        "id": 97,
        "title": "Carbohydrates",
        "link": "/HumanHealth/Carbohydrates",
        "primary_category": "Human Health",
        "secondary_category": "Healthy Food"
      },
      {
        "id": 98,
        "title": "Nutrition for HIV Positive",
        "link": "/HumanHealth/Nutrition-HIV-Positive",
        "primary_category": "Human Health",
        "secondary_category": "Healthy Food"
      },
      {
        "id": 99,
        "title": "Vitamins",
        "link": "/HumanHealth/Vitamins",
        "primary_category": "Human Health",
        "secondary_category": "Healthy Food"
      },
      {
        "id": 100,
        "title": "Fats in Human Health",
        "link": "/HumanHealth/Fats-Human-Health",
        "primary_category": "Human Health",
        "secondary_category": "Healthy Food"
      },
      {
        "id": 101,
        "title": "Nutrition in Adolescents",
        "link": "/HumanHealth/Nutrition-Adolescents",
        "primary_category": "Human Health",
        "secondary_category": "Healthy Food"
      },
      {
        "id": 102,
        "title": "Feeding your baby",
        "link": "/HumanHealth/Feeding-your-baby",
        "primary_category": "Human Health",
        "secondary_category": "Healthy Food"
      },
      {
        "id": 103,
        "title": "Nutrition in Pregnancy",
        "link": "/HumanHealth/Nutrition-Pregnancy",
        "primary_category": "Human Health",
        "secondary_category": "Healthy Food"
      },
      {
        "id": 104,
        "title": "Hypertension (High Blood Pressure",
        "link": "/HumanHealth/Hypertension-High-Blood-Pressure",
        "primary_category": "Human Health",
        "secondary_category": "Nutrition Related Diseases"
      },
      {
        "id": 105,
        "title": "Peptic Ulcer Disease",
        "link": "/HumanHealth/Peptic-Ulcer-Disease",
        "primary_category": "Human Health",
        "secondary_category": "Nutrition Related Diseases"
      },
      {
        "id": 106,
        "title": "Diabetes",
        "link": "/HumanHealth/Diabetes",
        "primary_category": "Human Health",
        "secondary_category": "Nutrition Related Diseases"
      },
      {
        "id": 107,
        "title": "Indigestion (Dyspepsia)",
        "link": "/HumanHealth/Indigestion-Dyspepsia",
        "primary_category": "Human Health",
        "secondary_category": "Nutrition Related Diseases"
      },
      {
        "id": 108,
        "title": "Anaemia",
        "link": "/HumanHealth/Anaemia",
        "primary_category": "Human Health",
        "secondary_category": "Nutrition Related Diseases"
      },
      {
        "id": 109,
        "title": "Rickets / Osteomalacia",
        "link": "/HumanHealth/Rickets-Osteomalacia",
        "primary_category": "Human Health",
        "secondary_category": "Nutrition Related Diseases"
      },
      {
        "id": 110,
        "title": "Goiter: e.a. Iodine deficiency",
        "link": "/HumanHealth/Goiter-ea-Iodine-deficiency",
        "primary_category": "Human Health",
        "secondary_category": "Nutrition Related Diseases"
      },
      {
        "id": 111,
        "title": "Malnutrition",
        "link": "/HumanHealth/Malnutrition",
        "primary_category": "Human Health",
        "secondary_category": "Nutrition Related Diseases"
      },
      {
        "id": 112,
        "title": "Ariboflavinosis: Vit B2 deficiency",
        "link": "/HumanHealth/Ariboflavinosis-Vit-B2-deficiency",
        "primary_category": "Human Health",
        "secondary_category": "Nutrition Related Diseases"
      },
      {
        "id": 113,
        "title": "Scurvy",
        "link": "/HumanHealth/Scurvy",
        "primary_category": "Human Health",
        "secondary_category": "Nutrition Related Diseases"
      },
      {
        "id": 114,
        "title": "Gout/Uric Acid",
        "link": "/HumanHealth/GoutUric-Acid",
        "primary_category": "Human Health",
        "secondary_category": "Nutrition Related Diseases"
      },
      {
        "id": 115,
        "title": "Osteoporosis",
        "link": "/HumanHealth/Osteoporosis",
        "primary_category": "Human Health",
        "secondary_category": "Nutrition Related Diseases"
      },
      {
        "id": 116,
        "title": "Beriberi: Vitamin B1 deficiency",
        "link": "/HumanHealth/Beriberi-Vitamin-B1-deficiency",
        "primary_category": "Human Health",
        "secondary_category": "Nutrition Related Diseases"
      },
      {
        "id": 117,
        "title": "Vitamin A deficiency",
        "link": "/HumanHealth/Vitamin-deficiency",
        "primary_category": "Human Health",
        "secondary_category": "Nutrition Related Diseases"
      },
      {
        "id": 118,
        "title": "High Cholesterol (Hypercholestrolemia)",
        "link": "/HumanHealth/High-Cholesterol-Hypercholestrolemia",
        "primary_category": "Human Health",
        "secondary_category": "Nutrition Related Diseases"
      },
      {
        "id": 119,
        "title": "Pellagra",
        "link": "/HumanHealth/Pellagra",
        "primary_category": "Human Health",
        "secondary_category": "Nutrition Related Diseases"
      },
      {
        "id": 120,
        "title": "Constipation",
        "link": "/HumanHealth/Constipation",
        "primary_category": "Human Health",
        "secondary_category": "Nutrition Related Diseases"
      },
      {
        "id": 121,
        "title": "Allergies",
        "link": "/HumanHealth/Allergies",
        "primary_category": "Human Health",
        "secondary_category": "Nutrition Related Diseases"
      },
      {
        "id": 122,
        "title": "Malaria",
        "link": "/HumanHealth/Malaria",
        "primary_category": "Human Health",
        "secondary_category": "Insect Transmitted Diseases"
      },
      {
        "id": 123,
        "title": "Challenges",
        "link": "/HumanHealth/Challenges",
        "primary_category": "Human Health",
        "secondary_category": "Zoonotic Diseases"
      },
      {
        "id": 124,
        "title": "Introduction - What are zoonoses?",
        "link": "/HumanHealth/Introduction-What-are-zoonoses",
        "primary_category": "Human Health",
        "secondary_category": "Zoonotic Diseases"
      },
      {
        "id": 125,
        "title": "How people get infected: transmission, risk factors",
        "link": "/HumanHealth/How-people-get-infected-transmission-risk-factors",
        "primary_category": "Human Health",
        "secondary_category": "Zoonotic Diseases"
      },
      {
        "id": 126,
        "title": "The impact of zoonoses on daily life",
        "link": "/HumanHealth/Impact-zoonoses-daily-life",
        "primary_category": "Human Health",
        "secondary_category": "Zoonotic Diseases"
      },
      {
        "id": 127,
        "title": "How to prevent occurrence of zoonotic diseases",
        "link": "/HumanHealth/How-prevent-occurrence-zoonotic-diseases",
        "primary_category": "Human Health",
        "secondary_category": "Zoonotic Diseases"
      },
      {
        "id": 128,
        "title": "Examples of zoonoses",
        "link": "/HumanHealth/Examples-zoonoses",
        "primary_category": "Human Health",
        "secondary_category": "Zoonotic Diseases"
      },
      {
        "id": 129,
        "title": "How does poor sanitation lead to health problems ?",
        "link": "/HumanHealth/How-does-poor-sanitation-lead-health-problems",
        "primary_category": "Human Health",
        "secondary_category": "Hygiene & Sanitation"
      },
      {
        "id": 130,
        "title": "Introduction to Hygiene and Sanitation",
        "link": "/HumanHealth/Introduction-Hygiene-and-Sanitation",
        "primary_category": "Human Health",
        "secondary_category": "Hygiene & Sanitation"
      },
      {
        "id": 131,
        "title": "Hand washing with soap and water",
        "link": "/HumanHealth/Hand-washing-soap-and-water",
        "primary_category": "Human Health",
        "secondary_category": "Hygiene & Sanitation"
      },
      {
        "id": 132,
        "title": "Planning for sanitation",
        "link": "/HumanHealth/Planning-sanitation",
        "primary_category": "Human Health",
        "secondary_category": "Hygiene & Sanitation"
      },
      {
        "id": 133,
        "title": "Toilet Choice",
        "link": "/HumanHealth/Toilet-Choice",
        "primary_category": "Human Health",
        "secondary_category": "Hygiene & Sanitation"
      },
      {
        "id": 134,
        "title": "Tools for livestock care and treatment",
        "link": "/AnimalHealth/Tools-livestock-care-and-treatment",
        "primary_category": "Animal Health",
        "secondary_category": "Animal Husbandry & Welfare"
      },
      {
        "id": 135,
        "title": "Water for livestock",
        "link": "/AnimalHealth/Water-livestock",
        "primary_category": "Animal Health",
        "secondary_category": "Animal Husbandry & Welfare"
      },
      {
        "id": 136,
        "title": "Record keeping",
        "link": "/AnimalHealth/Record-keeping",
        "primary_category": "Animal Health",
        "secondary_category": "Animal Husbandry & Welfare"
      },
      {
        "id": 137,
        "title": "Drugs for livestock treatment",
        "link": "/AnimalHealth/Drugs-livestock-treatment",
        "primary_category": "Animal Health",
        "secondary_category": "Animal Husbandry & Welfare"
      },
      {
        "id": 138,
        "title": "Holistic disease management and veterinary treatment",
        "link": "/AnimalHealth/Holistic-disease-management-and-veterinary-treatment",
        "primary_category": "Animal Health",
        "secondary_category": "Animal Husbandry & Welfare"
      },
      {
        "id": 139,
        "title": "Animal nutrition and feed rations",
        "link": "/AnimalHealth/Animal-nutrition-and-feed-rations",
        "primary_category": "Animal Health",
        "secondary_category": "Animal Husbandry & Welfare"
      },
      {
        "id": 140,
        "title": "Organic animal husbandry: Breeding, housing and feeding animals",
        "link": "/AnimalHealth/Organic-animal-husbandry-Breeding-housing-and-feeding-animals",
        "primary_category": "Animal Health",
        "secondary_category": "Animal Husbandry & Welfare"
      },
      {
        "id": 141,
        "title": "A calf life worth living",
        "link": "/AnimalHealth/calf-life-worth-living",
        "primary_category": "Animal Health",
        "secondary_category": "Animal Husbandry & Welfare"
      },
      {
        "id": 142,
        "title": "Human - animal relations in organic agriculture",
        "link": "/AnimalHealth/Human-animal-relations",
        "primary_category": "Animal Health",
        "secondary_category": "Animal Husbandry & Welfare"
      },
      {
        "id": 143,
        "title": "What to consider when choosing to keep animals",
        "link": "/AnimalHealth/What-consider-when-choosing-keep-animals",
        "primary_category": "Animal Health",
        "secondary_category": "Animal Husbandry & Welfare"
      },
      {
        "id": 144,
        "title": "Organic Norms (IFOAM)",
        "link": "/AnimalHealth/Organic-Norms-IFOAM",
        "primary_category": "Animal Health",
        "secondary_category": "Animal Husbandry & Welfare"
      },
      {
        "id": 145,
        "title": "Animal health & welfare",
        "link": "/AnimalHealth/animal-health-promotion-welfare-and-disease-prevention",
        "primary_category": "Animal Health",
        "secondary_category": "Animal Husbandry & Welfare"
      },
      {
        "id": 146,
        "title": "Cattle (new with animal welfare standards)",
        "link": "/AnimalHealth/Cattle-new-animal-welfare-standards",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Species"
      },
      {
        "id": 147,
        "title": "Donkeys (new, with animal welfare information",
        "link": "/AnimalHealth/Donkeys-new-animal-welfare-information",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Species"
      },
      {
        "id": 148,
        "title": "Poultry: Geese (New with animal welfare information)",
        "link": "/AnimalHealth/Poultry-Geese-New-animal-welfare-information",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Species"
      },
      {
        "id": 149,
        "title": "Cattle breeds and Breeding",
        "link": "/AnimalHealth/Cattle-breeds-and-Breeding",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Species"
      },
      {
        "id": 150,
        "title": "Fish farming (new, with animal welfare information)",
        "link": "/AnimalHealth/Fish-farming-new-animal-welfare-information",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Species"
      },
      {
        "id": 151,
        "title": "Rabbits (new with animal welfare information)",
        "link": "/AnimalHealth/Rabbits-new-animal-welfare-information",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Species"
      },
      {
        "id": 152,
        "title": "Beekeeping",
        "link": "/AnimalHealth/Beekeeping",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Species"
      },
      {
        "id": 153,
        "title": "Goats (new with animal welfare information)",
        "link": "/AnimalHealth/Goats-new-animal-welfare-information",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Species"
      },
      {
        "id": 154,
        "title": "Sheep (new, with animal welfare information)",
        "link": "/AnimalHealth/Sheep-new-animal-welfare-information",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Species"
      },
      {
        "id": 155,
        "title": "Camels (new, with animal welfare information)",
        "link": "/AnimalHealth/Camels-new-animal-welfare-information",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Species"
      },
      {
        "id": 156,
        "title": "Mulberry Silkworm",
        "link": "/AnimalHealth/Mulberry-Silkworm",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Species"
      },
      {
        "id": 157,
        "title": "Chicken (new, with animal welfare information)",
        "link": "/AnimalHealth/Chicken-new-animal-welfare-information",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Species"
      },
      {
        "id": 158,
        "title": "Pigs (new, with animal welfare information)",
        "link": "/AnimalHealth/Pigs-new-animal-welfare-information",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Species"
      },
      {
        "id": 159,
        "title": "Disease Prevention NEW",
        "link": "/AnimalHealth/Disease-Prevention",
        "primary_category": "Animal Health",
        "secondary_category": "Animal Husbandry & Welfare"
      },
      {
        "id": 160,
        "title": "Diagnosis of Animal Diseases NEW",
        "link": "/AnimalHealth/Diagnosis-Animal-Diseases",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 161,
        "title": "Abortion and Stillbirth",
        "link": "/AnimalHealth/Abortion-and-Stillbirth",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 162,
        "title": "Assisting with birth in cattle and small ruminants (goats and sheep)",
        "link": "/AnimalHealth/Assisting-birth-cattle-and-small-ruminants-goats-and-sheep",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 163,
        "title": "Adult Respiratory Diseases",
        "link": "/AnimalHealth/Adult-Respiratory-Diseases",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 164,
        "title": "Calf problems",
        "link": "/AnimalHealth/Young-animals-Calf-problems",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 165,
        "title": "Reproductive problems",
        "link": "/AnimalHealth/Reproductive-problems",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 166,
        "title": "Brucellosis",
        "link": "/AnimalHealth/Brucellosis",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 167,
        "title": "Eye problems",
        "link": "/AnimalHealth/Eye-problems",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 168,
        "title": "Flies and Mosquito Borne Diseases",
        "link": "/AnimalHealth/Flies-and-Mosquito-Borne-Diseases",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 169,
        "title": "New Castle disease",
        "link": "/AnimalHealth/New-Castle-disease",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 170,
        "title": "Nutritional Deficiencies",
        "link": "/AnimalHealth/Nutritional-Deficiencies",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 171,
        "title": "Plant and Other Poisoning",
        "link": "/AnimalHealth/Plant-and-Other-Poisoning",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 172,
        "title": "Specific and Management Diseases",
        "link": "/AnimalHealth/Specific-Management-Diseases",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 173,
        "title": "Skin problems",
        "link": "/AnimalHealth/Skin-problems",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 174,
        "title": "Zoonotic diseases",
        "link": "/AnimalHealth/Zoonotic-diseases",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 175,
        "title": "Tick Borne Diseases",
        "link": "/AnimalHealth/Tick-Borne-Diseases",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 176,
        "title": "Worms",
        "link": "/AnimalHealth/Worms",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 177,
        "title": "Fodder production",
        "link": "/AnimalHealth/Fodder-production",
        "primary_category": "Animal Health",
        "secondary_category": "Fodder Production"
      },
      {
        "id": 178,
        "title": "Conservation of maize stovers",
        "link": "/AnimalHealth/Conservation-maize-stovers",
        "primary_category": "Animal Health",
        "secondary_category": "Fodder Production"
      },
      {
        "id": 179,
        "title": "Hay Making",
        "link": "/AnimalHealth/Hay-Making",
        "primary_category": "Animal Health",
        "secondary_category": "Fodder Production"
      },
      {
        "id": 180,
        "title": "Mulberry Trees",
        "link": "/AnimalHealth/Mulberry-Trees",
        "primary_category": "Animal Health",
        "secondary_category": "Fodder Production"
      },
      {
        "id": 181,
        "title": "Silage making",
        "link": "/AnimalHealth/Silage-making",
        "primary_category": "Animal Health",
        "secondary_category": "Fodder Production"
      },
      {
        "id": 182,
        "title": "Bee products",
        "link": "/AnimalHealth/Bee-products",
        "primary_category": "Animal Health",
        "secondary_category": "Products"
      },
      {
        "id": 183,
        "title": "Leather production",
        "link": "/AnimalHealth/Leather-production",
        "primary_category": "Animal Health",
        "secondary_category": "Products"
      },
      {
        "id": 184,
        "title": "Manure",
        "link": "/AnimalHealth/Manure",
        "primary_category": "Animal Health",
        "secondary_category": "Products"
      },
      {
        "id": 185,
        "title": "Milk and Dairy products",
        "link": "/AnimalHealth/Milk-and-Dairy-products",
        "primary_category": "Animal Health",
        "secondary_category": "Products"
      },
      {
        "id": 186,
        "title": "Sericulture as a Business",
        "link": "/AnimalHealth/Sericulture-Business",
        "primary_category": "Animal Health",
        "secondary_category": "Products"
      },
      {
        "id": 187,
        "title": "",
        "link": "/PlantHealth/Crops/African-Nightshade",
        "primary_category": "Plant Health",
        "secondary_category": "Indigenous"
      },
      {
        "id": 188,
        "title": "",
        "link": "/PlantHealth/Crops/Amaranth",
        "primary_category": "Plant Health",
        "secondary_category": "Indigenous"
      },
      {
        "id": 189,
        "title": "",
        "link": "/PlantHealth/Crops/Avocados",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 190,
        "title": "",
        "link": "/PlantHealth/Crops/Bananas",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 191,
        "title": "",
        "link": "/PlantHealth/Crops/Beans",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 192,
        "title": "",
        "link": "/PlantHealth/Crops/CabbageKale-Brassicas",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 193,
        "title": "",
        "link": "/PlantHealth/Crops/Carrot",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 194,
        "title": "",
        "link": "/PlantHealth/Crops/Cashew",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 195,
        "title": "",
        "link": "/PlantHealth/Crops/Cassava",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 196,
        "title": "",
        "link": "/PlantHealth/Crops/Citrus-plants",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 197,
        "title": "",
        "link": "/PlantHealth/Crops/Cocoa",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 198,
        "title": "",
        "link": "/PlantHealth/Crops/Coconut",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 199,
        "title": "",
        "link": "/PlantHealth/Crops/Coffee",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 200,
        "title": "",
        "link": "/PlantHealth/Crops/Cotton",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 201,
        "title": "",
        "link": "/PlantHealth/Crops/Cowpea",
        "primary_category": "Plant Health",
        "secondary_category": "Indigenous"
      },
      {
        "id": 202,
        "title": "",
        "link": "/PlantHealth/Crops/Cucumber",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 203,
        "title": "",
        "link": "/PlantHealth/Crops/Eggplant",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 204,
        "title": "",
        "link": "/PlantHealth/Crops/Green-gram",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 205,
        "title": "",
        "link": "/PlantHealth/Crops/Groundnut",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 206,
        "title": "",
        "link": "/PlantHealth/Crops/Maize",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 207,
        "title": "",
        "link": "/PlantHealth/Crops/Maize-Seed-Production",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 208,
        "title": "",
        "link": "/PlantHealth/Crops/Mango",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 209,
        "title": "",
        "link": "/PlantHealth/Crops/Millet",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 210,
        "title": "",
        "link": "/PlantHealth/Crops/Mushrooms",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 211,
        "title": "",
        "link": "/PlantHealth/Crops/Okra",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 212,
        "title": "",
        "link": "/PlantHealth/Crops/Onion",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 213,
        "title": "",
        "link": "/PlantHealth/Crops/Papaya",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 214,
        "title": "",
        "link": "/PlantHealth/Crops/Passion-fruit",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 215,
        "title": "",
        "link": "/PlantHealth/Crops/Peas",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 216,
        "title": "",
        "link": "/PlantHealth/Crops/Peppers",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 217,
        "title": "",
        "link": "/PlantHealth/Crops/Pigeon-pea",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 218,
        "title": "",
        "link": "/PlantHealth/Crops/Pineapple",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 219,
        "title": "",
        "link": "/PlantHealth/Crops/Potato",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 220,
        "title": "",
        "link": "/PlantHealth/Crops/Potato-Seed-Production",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 221,
        "title": "",
        "link": "/PlantHealth/Crops/Pumpkin",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 222,
        "title": "",
        "link": "/PlantHealth/Crops/Rice",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 223,
        "title": "",
        "link": "/PlantHealth/Crops/Sesame",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 224,
        "title": "",
        "link": "/PlantHealth/Crops/Sorghum",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 225,
        "title": "",
        "link": "/PlantHealth/Crops/Soybean",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 226,
        "title": "",
        "link": "/PlantHealth/Crops/Spider-plant",
        "primary_category": "Plant Health",
        "secondary_category": "Indigenous"
      },
      {
        "id": 227,
        "title": "",
        "link": "/PlantHealth/Crops/Spinach",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 228,
        "title": "",
        "link": "/PlantHealth/Crops/Sugarcane",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 229,
        "title": "",
        "link": "/PlantHealth/Crops/Sweet-potato",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 230,
        "title": "",
        "link": "/PlantHealth/Crops/Tea",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 231,
        "title": "",
        "link": "/PlantHealth/Crops/Teff",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 232,
        "title": "",
        "link": "/PlantHealth/Crops/Tomato",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 233,
        "title": "",
        "link": "/PlantHealth/Crops/Watermelon",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 234,
        "title": "",
        "link": "/PlantHealth/Crops/Wheat",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 235,
        "title": "",
        "link": "/PlantHealth/Crops/Yam",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 236,
        "title": "",
        "link": "/PlantHealth/Crops/ZucchiniCourgette",
        "primary_category": "Plant Health",
        "secondary_category": "Crops, Fruits & Vegetables"
      },
      {
        "id": 237,
        "title": "",
        "link": "/PlantHealth/Pests/African-armyworm",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 238,
        "title": "",
        "link": "/PlantHealth/Pests/African-bollworm",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 239,
        "title": "",
        "link": "/PlantHealth/Pests/African-cassava-mosaic-virus-ACMV",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 240,
        "title": "",
        "link": "/PlantHealth/Pests/African-maize-stalkborer",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 241,
        "title": "",
        "link": "/PlantHealth/Pests/Anthracnose",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 242,
        "title": "",
        "link": "/PlantHealth/Pests/Aphids",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 243,
        "title": "",
        "link": "/PlantHealth/Pests/Bacterial-wilt",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 244,
        "title": "",
        "link": "/PlantHealth/Pests/Bagrada-bug",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 245,
        "title": "",
        "link": "/PlantHealth/Pests/Banana-weevil",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 246,
        "title": "",
        "link": "/PlantHealth/Pests/Black-rot",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 247,
        "title": "",
        "link": "/PlantHealth/Pests/Broomrape",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 248,
        "title": "",
        "link": "/PlantHealth/Pests/Cabbage-looper",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 249,
        "title": "",
        "link": "/PlantHealth/Pests/Cabbage-moth",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 250,
        "title": "",
        "link": "/PlantHealth/Pests/Cabbage-webworm",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 251,
        "title": "",
        "link": "/PlantHealth/Pests/Couch-grass",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 252,
        "title": "",
        "link": "/PlantHealth/Pests/Cowpea-seed-beetle",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 253,
        "title": "",
        "link": "/PlantHealth/Pests/Cutworms",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 254,
        "title": "",
        "link": "/PlantHealth/Pests/Damping-diseases",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 255,
        "title": "",
        "link": "/PlantHealth/Pests/Diamondback-moth-DBM",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 256,
        "title": "",
        "link": "/PlantHealth/Pests/Dodder",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 257,
        "title": "",
        "link": "/PlantHealth/Pests/Downy-mildew",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 258,
        "title": "",
        "link": "/PlantHealth/Pests/Early-blight",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 259,
        "title": "",
        "link": "/PlantHealth/Pests/Fruit-flies",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 260,
        "title": "",
        "link": "/PlantHealth/Pests/Fusarium-wilt",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 261,
        "title": "",
        "link": "/PlantHealth/Pests/Larger-grain-borer-LGB",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 262,
        "title": "",
        "link": "/PlantHealth/Pests/Late-blight",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 263,
        "title": "",
        "link": "/PlantHealth/Pests/Leafmining-flies-Leafminers",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 264,
        "title": "",
        "link": "/PlantHealth/Pests/Mango-seed-weevil",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 265,
        "title": "",
        "link": "/PlantHealth/Pests/Mealybugs",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 266,
        "title": "",
        "link": "/PlantHealth/Pests/Powdery-mildew",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 267,
        "title": "",
        "link": "/PlantHealth/Pests/Purple-witchweed",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 268,
        "title": "",
        "link": "/PlantHealth/Pests/Root-knot-nematodes",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 269,
        "title": "",
        "link": "/PlantHealth/Pests/Sedges",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 270,
        "title": "",
        "link": "/PlantHealth/Pests/Snails-Giant-East-African-Snail",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 271,
        "title": "",
        "link": "/PlantHealth/Pests/Spider-mites",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 272,
        "title": "",
        "link": "/PlantHealth/Pests/Spotted-stemborer",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 273,
        "title": "",
        "link": "/PlantHealth/Pests/Storage-pests",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 274,
        "title": "",
        "link": "/PlantHealth/Pests/Sweet-potato-weevil",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 275,
        "title": "",
        "link": "/PlantHealth/Pests/Termites",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 276,
        "title": "",
        "link": "/PlantHealth/Pests/Thrips",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 277,
        "title": "",
        "link": "/PlantHealth/Pests/Tomato-Yellow-Leaf-Curl-Virus-Disease-TYLCV",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 278,
        "title": "",
        "link": "/PlantHealth/Pests/Turnip-Mosaic-Virus-TuMV",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 279,
        "title": "",
        "link": "/PlantHealth/Pests/Weeds",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 280,
        "title": "",
        "link": "/PlantHealth/Pests/Whiteflies",
        "primary_category": "Plant Health",
        "secondary_category": "Pests & Diseases"
      },
      {
        "id": 281,
        "title": "",
        "link": "/PlantHealth/MedicinalPlants/Artemisia",
        "primary_category": "Plant Health",
        "secondary_category": "Medicinal Plants"
      },
      {
        "id": 282,
        "title": "",
        "link": "/PlantHealth/MedicinalPlants/Mondia",
        "primary_category": "Plant Health",
        "secondary_category": "Medicinal Plants"
      },
      {
        "id": 283,
        "title": "",
        "link": "/PlantHealth/MedicinalPlants/Moringa",
        "primary_category": "Plant Health",
        "secondary_category": "Medicinal Plants"
      },
      {
        "id": 284,
        "title": "",
        "link": "/PlantHealth/MedicinalPlants/Neem",
        "primary_category": "Plant Health",
        "secondary_category": "Medicinal Plants"
      },
      {
        "id": 285,
        "title": "",
        "link": "/PlantHealth/MedicinalPlants/Ocimum-kilimandscharicum",
        "primary_category": "Plant Health",
        "secondary_category": "Medicinal Plants"
      },
      {
        "id": 286,
        "title": "",
        "link": "/PlantHealth/MedicinalPlants/Pelargonium",
        "primary_category": "Plant Health",
        "secondary_category": "Medicinal Plants"
      },
      {
        "id": 287,
        "title": "",
        "link": "/PlantHealth/MedicinalPlants/Prunus-africana",
        "primary_category": "Plant Health",
        "secondary_category": "Medicinal Plants"
      },
      {
        "id": 288,
        "title": "",
        "link": "/PlantHealth/MedicinalPlants/Sutherlandia",
        "primary_category": "Plant Health",
        "secondary_category": "Medicinal Plants"
      },
      {
        "id": 289,
        "title": "",
        "link": "/PlantHealth/MedicinalPlants/Tamarind",
        "primary_category": "Plant Health",
        "secondary_category": "Medicinal Plants"
      },
      {
        "id": 290,
        "title": "",
        "link": "/PlantHealth/Drying-fruit-and-vegetables",
        "primary_category": "Plant Health",
        "secondary_category": "Fruits & Vegetable Processing"
      },
      {
        "id": 291,
        "title": "",
        "link": "/PlantHealth/Methods-tomato-preservation",
        "primary_category": "Plant Health",
        "secondary_category": "Fruits & Vegetable Processing"
      },
      {
        "id": 292,
        "title": "",
        "link": "/PlantHealth/Vegetable-preserves",
        "primary_category": "Plant Health",
        "secondary_category": "Fruits & Vegetable Processing"
      },
      {
        "id": 293,
        "title": "",
        "link": "/PlantHealth/Bio-fumigation",
        "primary_category": "Plant Health",
        "secondary_category": "Natural Pest Control"
      },
      {
        "id": 294,
        "title": "",
        "link": "/PlantHealth/Bio-pesticide-Bt-Bacillus-thuringiensis",
        "primary_category": "Plant Health",
        "secondary_category": "Natural Pest Control"
      },
      {
        "id": 295,
        "title": "",
        "link": "/PlantHealth/Biopesticides-Kenya",
        "primary_category": "Plant Health",
        "secondary_category": "Natural Pest Control"
      },
      {
        "id": 296,
        "title": "",
        "link": "/PlantHealth/Copper-fungicides-Kenya",
        "primary_category": "Plant Health",
        "secondary_category": "Natural Pest Control"
      },
      {
        "id": 297,
        "title": "",
        "link": "/PlantHealth/Flour-preparation",
        "primary_category": "Plant Health",
        "secondary_category": "Natural Pest Control"
      },
      {
        "id": 298,
        "title": "",
        "link": "/PlantHealth/Hot-water-treatment",
        "primary_category": "Plant Health",
        "secondary_category": "Natural Pest Control"
      },
      {
        "id": 299,
        "title": "",
        "link": "/PlantHealth/Natural-enemies",
        "primary_category": "Plant Health",
        "secondary_category": "Natural Pest Control"
      },
      {
        "id": 300,
        "title": "",
        "link": "/PlantHealth/Plant-extract-Garlic",
        "primary_category": "Plant Health",
        "secondary_category": "Natural Pest Control"
      },
      {
        "id": 301,
        "title": "",
        "link": "/PlantHealth/Plant-extract-Neem",
        "primary_category": "Plant Health",
        "secondary_category": "Natural Pest Control"
      },
      {
        "id": 302,
        "title": "",
        "link": "/PlantHealth/Plant-extract-Pyrethrum",
        "primary_category": "Plant Health",
        "secondary_category": "Natural Pest Control"
      },
      {
        "id": 303,
        "title": "",
        "link": "/PlantHealth/Plants-crop-protection-properties",
        "primary_category": "Plant Health",
        "secondary_category": "Natural Pest Control"
      },
      {
        "id": 304,
        "title": "",
        "link": "/PlantHealth/Soap-spray",
        "primary_category": "Plant Health",
        "secondary_category": "Natural Pest Control"
      },
      {
        "id": 305,
        "title": "",
        "link": "/PlantHealth/Solarisation",
        "primary_category": "Plant Health",
        "secondary_category": "Natural Pest Control"
      },
      {
        "id": 306,
        "title": "",
        "link": "/PlantHealth/Sulphur-pesticides-Kenya",
        "primary_category": "Plant Health",
        "secondary_category": "Natural Pest Control"
      },
      {
        "id": 307,
        "title": "",
        "link": "/PlantHealth/Traps-and-Bagging",
        "primary_category": "Plant Health",
        "secondary_category": "Natural Pest Control"
      },
      {
        "id": 308,
        "title": "",
        "link": "/PlantHealth/Composting",
        "primary_category": "Plant Health",
        "secondary_category": "Cultural Practices"
      },
      {
        "id": 309,
        "title": "",
        "link": "/PlantHealth/Conservation-tillage-systems",
        "primary_category": "Plant Health",
        "secondary_category": "Cultural Practices"
      },
      {
        "id": 310,
        "title": "",
        "link": "/PlantHealth/Crop-rotation",
        "primary_category": "Plant Health",
        "secondary_category": "Cultural Practices"
      },
      {
        "id": 311,
        "title": "",
        "link": "/PlantHealth/Field-sanitation",
        "primary_category": "Plant Health",
        "secondary_category": "Cultural Practices"
      },
      {
        "id": 312,
        "title": "",
        "link": "/PlantHealth/Green-Manure-Cover-Crop-Legumes",
        "primary_category": "Plant Health",
        "secondary_category": "Cultural Practices"
      },
      {
        "id": 313,
        "title": "",
        "link": "/PlantHealth/Intercropping-and-Push-Pull",
        "primary_category": "Plant Health",
        "secondary_category": "Cultural Practices"
      },
      {
        "id": 314,
        "title": "",
        "link": "/PlantHealth/Introduction-organic-plant-nutrition",
        "primary_category": "Plant Health",
        "secondary_category": "Cultural Practices"
      },
      {
        "id": 315,
        "title": "",
        "link": "/PlantHealth/Mulching",
        "primary_category": "Plant Health",
        "secondary_category": "Cultural Practices"
      },
      {
        "id": 316,
        "title": "",
        "link": "/PlantHealth/Weed-management",
        "primary_category": "Plant Health",
        "secondary_category": "Cultural Practices"
      },
      {
        "id": 317,
        "title": "",
        "link": "/AnimalHealth/Birth-and-Reproduction-complications",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 318,
        "title": "Pets: Dogs (new)",
        "link": "/AnimalHealth/Pets-Dogs-new",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Species"
      },
      {
        "id": 319,
        "title": "Pets: Cats (new)",
        "link": "/AnimalHealth/Pets-Cats-new",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Species"
      },
      {
        "id": 320,
        "title": "",
        "link": "/AnimalHealth/Nutritional-Deficiencies-new",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 321,
        "title": "",
        "link": "/AnimalHealth/Flies-and-Mosquito-Borne-Diseases",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 322,
        "title": "",
        "link": "/AnimalHealth/Diarrhea-adults",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 323,
        "title": "",
        "link": "/AnimalHealth/New-Castle-disease",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 324,
        "title": "",
        "link": "/AnimalHealth/Eye-problems",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 325,
        "title": "",
        "link": "/AnimalHealth/Adult-Respiratory-Diseases",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 326,
        "title": "",
        "link": "/AnimalHealth/Udder-health-and-Mastitis",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 327,
        "title": "",
        "link": "/AnimalHealth/Young-animals-Lamb-and-Kids-problems",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 328,
        "title": "",
        "link": "/AnimalHealth/Young-animals-Calf-problems",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 329,
        "title": "",
        "link": "/AnimalHealth/Birth-and-Reproduction-complications",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 330,
        "title": "",
        "link": "/AnimalHealth/Assisting-birth-cattle-and-small-ruminants-goats-and-sheep",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 331,
        "title": "",
        "link": "/AnimalHealth/Abortion-and-Stillbirth",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 332,
        "title": "",
        "link": "/AnimalHealth/Diagnosis-Animal-Diseases",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 334,
        "title": "",
        "link": "/AnimalHealth/Paralysis-Stiffness-and-Lameness",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 335,
        "title": "",
        "link": "/AnimalHealth/Diseases-Killing-very-fast-Killer-diseases",
        "primary_category": "Animal Health",
        "secondary_category": "Livestock Health & Disease Management"
      },
      {
        "id": 336,
        "title": "Water cycle and rain information",
        "link": "/EnvironmentalHealth/Water-cycle-and-rain-information",
        "primary_category": "Environment Health",
        "secondary_category": "Water Management"
      },
      {
        "id": 337,
        "title": "Tamarind",
        "link": "/EnvironmentalHealth/Trees/Tamarind",
        "primary_category": "Environment Health",
        "secondary_category": "Trees"
      }
      ];

  		// Call AJAX function on page load
  		$(window).bind("load", function() {
     			// ajaxFunction();
     			readJSON(jsonData);
  		});


  		function readJSON(jsonData) {

  			for (var i = 0; i < jsonData.length; i++) {
  				
  				var jsonObj = jsonData[i];

  				// console.log(jsonObj); // For debugging

  				// Get link property from json object
  				var hrefLink = jsonObj.link;
  				// console.log(hrefLink); // For debugging

  				// Get secondary category from json object
  				var secondaryCategory = jsonObj.secondary_category;
  				// console.log(secondaryCategory); // For debugging

  				// Get current page address
  				var pageAddress = window.location.pathname;
  				// console.log(pageAddress); // For debugging

  				// open accordions based on link and secondary category
  				selectAccordion(hrefLink,pageAddress,secondaryCategory);
  			}
  		}
			
			var ph_list = [
				".view-ph-cf-veg-left-menu .view-content",
        ".view-ph-indigenous-plants-left-menu .view-content",
				".view-ph-pests-and-diseases-leftmenu .view-content",
				".view-ph-medicinal-plants-leftmenu .view-content",
				".view-ph-fruits-veg-processing-leftmenu .view-content",
				".view-ph-natural-pest-control-leftmenu .view-content",
				".view-ph-cultural-practices-leftmenu .view-content"
			];

			var ah_list = [
				".view-ah-animal-husbandry-and-welfare-leftmenu .view-content",
				".view-ah-livestock-species-leftmenu .view-content",
				".view-ah-livestock-health-and-diseases-leftmenu .view-content",
				".view-ph-fodder-production-leftmenu .view-content",
				".view-ah-products-leftmenu .view-content"
			];

			var eh_list = [
				".view-eh-agro-ecologic-zones-leftmenu .view-content",
				".view-eh-water-management-leftmenu  .view-content",
				".view-eh-soil-management-leftmenu .view-content",
				".view-eh-sustainable-agriculture-leftmenu .view-content",
				".view-eh-conservation-agriculture-leftmenu .view-content",
				".view-eh-agroforestry-leftmenu .view-content",
				".view-eh-trees-leftmenu  .view-content",
				".view-eh-processing-and-value-addition-leftmenu  .view-content"
			];

			var hh_list = [
				".view-hh-healthy-food-leftmenu .view-content",
				".view-hh-nutritional-related-diseases .view-content",
				".view-hh-insect-transmitted-diseases-leftmenu .view-content",
				".view-hh-zoonotic-diseases-leftmenu .view-content",
				".view-hh-hygiene-and-sanitation-leftmenu .view-content"
			];

			function selectAccordion(hrefLink,pageAddress,secondaryCategory) {
        // check if link property is the same as page address
  			if(window.location.href.indexOf(hrefLink) > -1) 
        {
    				switch(secondaryCategory) {
    					case "Agro Ecological Zone":
    						$( eh_list[0] ).show();
    						break;
    					case "Water Management":
    						$( eh_list[1] ).show();
    						break;
    					case "Soil Management":
    						$( eh_list[2] ).show();
    						break;
    					case "Sustainable & Organic Agriculture":
    						$( eh_list[3] ).show();
    						break;
    					case "Conservation Agriculture":
    						$( eh_list[4] ).show();
    						break;
    					case "Agroforestry":
    						$( eh_list[5] ).show();
    						break;
    					case "Trees":
    						$( eh_list[6] ).show();
    						break;
    					case "Processing & Value Addition":
    						$( eh_list[7] ).show();
    						break;
    					case "Healthy Food":
    						$( hh_list[0] ).show();
    						break;
    					case "Nutrition Related Diseases":
    						$( hh_list[1] ).show();
    						break;
    					case "Insect Transmitted Diseases":
    						$( hh_list[2] ).show();
    						break;
    					case "Zoonotic Diseases":
    						$( hh_list[3] ).show();
    						break;
    					case "Hygiene & Sanitation":
    						$( hh_list[4] ).show();
    						break;
    					case "Animal Husbandry & Welfare":
    						$( ah_list[0] ).show();
    						break;
    					case "Livestock Species":
    						$( ah_list[1] ).show();
    						break;
    					case "Livestock Health & Disease Management":
    						$( ah_list[2] ).show();
    						break;
    					case "Fodder Production":
    						$( ah_list[3] ).show();
    						break;
    					case "Products":
    						$( ah_list[4] ).show();
    						break;
    					case "Crops, Fruits & Vegetables":
    						$( ph_list[0] ).show();
    						break;
              case "Indigenous":
                $( ph_list[1] ).show();
                break;
    					case "Pests & Diseases":
    						$( ph_list[2] ).show();
    						break;
    					case "Medicinal Plants":
    						$( ph_list[3] ).show();
    						break;
    					case "Fruits & Vegetable Processing":
    						$( ph_list[4] ).show();
    						break;
    					case "Natural Pest Control":
    						$( ph_list[5] ).show();
    						break;
    					case "Cultural Practices":
    						$( ph_list[6] ).show();
    						break;
    				}
        }
		  }
  });
})(jQuery);
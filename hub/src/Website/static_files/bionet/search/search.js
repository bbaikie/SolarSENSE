window.offlineSearch = {};
(function($) {

  var qs = window.location.hash.substr(1).split("phrase=")[1];
  if (qs != undefined) {
    qs = qs.split(/[^A-Za-z]+/).join(" ");
  } else {
    qs = "";
  }

  // console.log(qs);
  // console.log(hash.split("phrase=")[1].replace("+"," "));
  window.offlineSearch.searchPhrase = qs;
  // $(document).ready(function(){
  //   clearElements();
  // });

  function search(phrase) {
    console.log(phrase);
    window.offlineSearch.searchPhrase = phrase;
    $(document).find('.page-header.search-phrase').html(phrase);
    var searchIndex = lunr.Index.load(index.index);

    var results = searchIndex.search(phrase);
    // console.log(results);

    var SearchResults = [];
    results.forEach(function(result) {
      var store = data.store;
      SearchResults.push(store[result.ref]);
    });
    if (window.offlineSearch != undefined) {
      window.offlineSearch.currentSearch = SearchResults;
      var categorize = _.groupBy(SearchResults, 'category');
      var cat = [];
      _.each(categorize, function(v, k) {
        cat.push({
          'title': k,
          'total': v.length
        });
      });

      window.offlineSearch.groupedSearch = _.orderBy(cat, 'total', ['desc']);
    }
    renderResults(SearchResults);

  }


  function renderResults(SearchResults) {
    if (SearchResults.length <= 0) {
      window.offlineSearch.groupedSearch = [];
      window.offlineSearch.currentSearch = [];
      $('div#data-container').html('<p><strong>No Search results found.</strong></p>');
      $('#advanced-search').html('<span>&nbsp;</span>');
      $('#pagination-container').html('');
    } else {
      var container = $('div#pagination-container').pagination({
        dataSource: SearchResults,
        callback: function(response, pagination) {
          var dataHtml = '<ul class="search-results apachesolr_search-results" style="list-style-type:none;">';
          $.each(response, function(index, item) {
            dataHtml += SearchItem(item);
          });
          dataHtml += '</ul>';
          $('div#data-container').html(dataHtml);
        }
      });
      if (window.offlineSearch.refreshFilter) {
        window.offlineSearch.refreshFilter = false;
        advancedSearchTpl(window.offlineSearch.groupedSearch);
      }
    }
  }

  function advancedSearch(phrase) {
    var selected_categories = [];
    var parent_container = $(document).find('ul#adv-search-items');
    var checkboxes = $(parent_container).find('input[type=checkbox]');
    $(checkboxes).each(function(k, c) {
      var checked = $(c).attr('checked');
      if (checked) {
        selected_categories.push($(c).attr('id').replace('chk-', ''));
      }
    });
    if (selected_categories.length > 0) {
      var dat = _.filter(window.offlineSearch.currentSearch, function(p) {
        return _.includes(selected_categories, p.category);
      });
      renderResults(dat);
    }
  };


  function advancedSearchTpl(content) {
    var s = "<p style='font-weight:500;border-bottom:1px solid #ccc;'>Use advanced search to narrow down your search results. You can filter your search by selecting the category checkboxes below. Furthermore, the search works for single or several search words.</p>";
    s += "<ul style='list-style-type:none;' id='adv-search-items'>";
    _.each(content, function(v, k) {
      var l = v.total;
      if (v.title.trim() != 'NA') {
        s += "<li><input type='checkbox' id='chk-" + v.title + "'/>&nbsp;&nbsp;<a href='javascript:;' class='adv-search-item' id='" + v.title + "'>" + v.title + " (" + l + ")</a></li>"
      }
    });
    s += "</ul>";
    s += "<div style='display:block;width: 100%;text-align: right;padding: 10px;'><a id='adv-filter' href='javascript:;' style='color:white;background:#BF2230;border:none;padding:10px;'>FILTER</a></div>";
    $('#advanced-search').html(s);
  }

  function SearchItem(content) {
    var hilite_phrase = window.offlineSearch.searchPhrase;
    // console.log(hilite_phrase);
    var string = '<li class="search-result">';
    string += '<h3 class="title">';
    string += '<a href="' + content.href + '#phrase=' + window.offlineSearch.searchPhrase + '">' + highlightText(hilite_phrase,content.title) + '</a>';
    string += '</h3>';
    string += '<div class="search-snippet-info">';
    string += '<p class="search-snippet">' + highlightText(hilite_phrase,content.content) + '</p>';
    if (content.date_time !== 'NA') {
      string += '<p class="search-info"><strong><i>' + content.date_time + '</i></strong></p>';
    }
    string += '</div>';
    string += '</li>';
    return string;
  }

  function highlightText(search_term, text) {
    console.log([search_term,text]);
    var sw = ["a", "about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also", "although", "always", "am", "among", "amongst", "amoungst", "amount", "an", "and", "another", "any", "anyhow", "anyone", "anything", "anyway", "anywhere", "are", "around", "as", "at", "back", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom", "but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven", "else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own", "part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the"];

    var qsArr = search_term.split(' ');
    var qsResult = [];
    for (var i = 0; i < qsArr.length; i++) {
      var w = qsArr[i];
      if (sw.indexOf(w.trim()) === -1) {
        qsResult.push(w);
        if (pluralize.isSingular(w)) {
          qsResult.push(pluralize.plural(w));
        }
        if (pluralize.isPlural) {
          qsResult.push(pluralize.singular(w));
        }
      }
    }
    var w = qsResult.join('|');
    var re = new RegExp(w, "gi");
    var res = text.replace(re, function myFunction(x) {
      return "<span style='background-color:yellow;'>" + x + "</span>";
    });
    return res;
  }

  function clearElements() {
    // console.log('we get here');
    $(document).find('h1.search-phrase').html('Searching...');
    $(document).find('div#data-container').html('<p>&nbsp</p>');
    $(document).find('#advanced-search').html('<span>&nbsp;</span>');
    $(document).find('#pagination-container').html('');
  }
  var phrase = qs;
  if (phrase.length > 0) {
    // clearElements();
    window.offlineSearch.refreshFilter = true;
    search(phrase);
  }
  $(document).on('submit', '#apachesolr-panels-search-block', function() {
    // clearElements();
    var search_box = $(document).find("input#edit-apachesolr-panels-search-form");
    var phrase = $(search_box).attr('value');
    $(search_box).attr('readonly');
    window.offlineSearch.refreshFilter = true;
    search(phrase);
    window.location.href = "./index.html#phrase=" + encodeURIComponent(phrase).replace(/%20/g, '+');
  });

  $(document).on('click', 'a#adv-filter', function() {
    window.offlineSearch.refreshFilter = false;
    advancedSearch(window.offlineSearch.searchPhrase);
  });

})(jQuery);

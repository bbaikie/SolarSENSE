function injectMarkJs() {
  (function($) {
    var level = "../";
    var level_0 = $(document).find("head link").last().attr('href').indexOf("");
    var level_1 = $(document).find("head link").last().attr('href').indexOf("../");
    var level_2 = $(document).find("head link").last().attr('href').indexOf("../../");
    var level_3 = $(document).find("head link").last().attr('href').indexOf("../../../");
    // console.log([level_0,level_1,level_2,level_3]);
    if (level_0 === 0) {
      level = "";
    }
    if (level_1 === 0) {
      level = "../";
    }
    if (level_2 === 0) {
      level = "../../";
    }
    if (level_3 === 0) {
      level = "../../../";
    }

    var qs = window.location.hash.substr(1).split("phrase=")[1];

    if (qs !== undefined) {
      qs = qs.replace('+', " ");
    } else {
      qs = "";
    }

    $(document).ready(function() {

      const body = document.getElementsByTagName('body')[0];
      const head = document.getElementsByTagName('head')[0];


      let links = document.createElement('script');
      links.setAttribute('src', level + 'search/links.js');
      body.appendChild(links);

      if (qs.length > 0) {
        let markjs = document.createElement('script');
        markjs.setAttribute('src', level + 'search/mark/jquery.mark.min.js');
        body.appendChild(markjs);

        let pluralize = document.createElement('script');
        pluralize.setAttribute('src', level + 'search/pluralize/pluralize.js');
        body.appendChild(pluralize);

        let highlightjs = document.createElement('script');
        highlightjs.setAttribute('src', level + 'search/highlite.js');
        body.appendChild(highlightjs);



      }
    });
  })(jQuery);
}
/*
 *capture the text input on the searchbox and redirect to the search page with
 *search parameters
 */
function offlineSearch() {
  var initSearch = (function($) {
    $(document).on('submit', 'form#apachesolr-panels-search-block', function() {
      var search_box = $(document).find("input#edit-apachesolr-panels-search-form");
      var phrase = $(search_box).attr('value');
      // $(search).attr('readonly');
      var encode_phrase = encodeURIComponent(phrase).replace(/%20/g, '+');
      // check of we are on the search page
      window.location.href = 'index.html#phrase=' + encode_phrase;
      if (window.location.href.indexOf("search") > -1) {} else {
        var level = "../";
        var level_0 = $(document).find("head link").last().attr('href').indexOf("");
        var level_1 = $(document).find("head link").last().attr('href').indexOf("../");
        var level_2 = $(document).find("head link").last().attr('href').indexOf("../../");
        var level_3 = $(document).find("head link").last().attr('href').indexOf("../../../");
        // console.log([level_0,level_1,level_2,level_3]);
        if (level_0 === 0) {
          level = "";
        }
        if (level_1 === 0) {
          level = "../";
        }
        if (level_2 === 0) {
          level = "../../";
        }
        if (level_3 === 0) {
          level = "../../../";
        }
        window.location.href = level + 'search/index.html#phrase=' + encode_phrase;
      }
    });
  })(jQuery);
}
offlineSearch();
injectMarkJs();

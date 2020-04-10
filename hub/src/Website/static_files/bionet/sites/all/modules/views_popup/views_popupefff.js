var popup_time = 0;
var popup_elem = 0;
var popup_show_timer = 0;
var popup_reset_timer = 0;

jQuery(function(){
  var popups  = document.getElementsByClassName('views-popup-window');	
  var targets = [];
  var i,j,popup,target_class,content, rows;

  if (popups.length == 0)
	return;
  
  popup_reset();
  
  // create list of target entries by class
  for ( i = 0 ; i < popups.length; i++) {
	popup = jQuery(popups[i]);
	
	target_class = popup.attr('class').match(/views-popup-(views-field-[^ ]*)/)[1]; // get substring
	
	for ( j = 0 ; ; j ++ ) {
	  if ( j < targets.length ) {
		if ( targets[j].class == target_class ) {
		  targets[j].array.push(popup);
		  break;	
		}  
	  } else {
		targets.push({class:target_class, array:[popup]})
		break;
	  }
	}
  }	

  // link popups to targets
  content=jQuery(popups[0]).parent().find('.view-content');
  
  if ( target_class == 'views-field--row-') {
	if ( content.children('.views-view-grid').length) {
      rows = content.find('.views-view-grid tbody tr td');	
	}  
	else if ( content.children('.views-table').length) {
	  rows = content.find('.views-table tbody tr');	
	} else {
	  // assume HTML or unformatted list
	  rows = content.find('.views-row');
	}
	
	// walk rows
	available_targets = targets[0].array.length ;
    for ( i = 0 ; ( i < rows.length ) && ( i < available_targets ) ; ++ i ) {
      popup_set_mouse(jQuery(rows[i]),targets[0].array[i]);	
    }   
  } else {
    // walk_tree(content);
	for ( i = 0 ; i < targets.length ; ++ i ) {
	  rows = content.find(
			  ( content.children('.views-table').length ? 'td' : '' ) + // hack because th/td use same class
			  '.' + targets[i].class);
      if (rows.length == targets[i].array.length)
        for ( j = 0 ; j < rows.length ; ++ j )
          popup_set_mouse(jQuery(rows[j]),targets[i].array[j]);	
	}
  }  
});


function popup_set_mouse(parent,popup) {
  // we love closures
  if ( Drupal.settings.views_popup.mode == 'click') {
    parent.click  (function()  { popup_show_click(parent,popup); });
    jQuery(window).scroll (function()  { if (popup.is(':visible')) popup_show_click(parent,popup); });
    popup.click   (function(e) { popup_hide_click(e,popup); });
  } else {
    parent.mouseover (function()  { popup_show(parent,popup); });
    parent.mouseout  (function()  { popup_hide(parent,popup); });
    parent.mousemove (function(e) { popup_move(parent,popup,e); });
  }
}


function popup_scroll(popup){
}
	
function popup_move(me,popup,evt){
  var top, left;

  if (Drupal.settings.views_popup.mode == 'mouse'){
    left = evt.pageX + 15;
    top = evt.pageY;

    popup.css({
      left: left + 'px',
      top: top + 'px'
    });
  }
}

function popup_hide_click(e,popup) {
  var elem = jQuery(e.target); 
  if (    elem.hasClass('views-popup-window-close-button')
	   || elem.hasClass('views-popup-window-custom-close-button')) // allow for buttons in window
	popup.hide();	
}

function popup_show_click(me,popup) {
  var top, left, pos ;
  var document = jQuery('document');	

  if ( popup_elem && popup_elem != popup ) {
    popup_elem.hide();
  }

  popup_elem = popup;
 
  pos  = me.offset();
  left = 2 + pos.left - window.scrollX ;
  top  = 4 + pos.top + me.height() - window.scrollY ;
  popup.css( { left: left + 'px', top:  top  + 'px' } );  

  popup.show();  
}

function popup_show(me,popup) {
  var top, left, pos ;
  var document = jQuery('document');

  if (popup == popup_elem) {
    return ; // already handled
  }

  if (Drupal.settings.views_popup.mode != 'mouse'){
    pos  = me.offset();
    left = 2 + pos.left - window.scrollX ;
    top  = 4 + pos.top + me.height() - window.scrollY ;
    popup.css( { left: left + 'px', top:  top  + 'px' } );
  }

  popup_clear_show_timer();

  if (popup_elem) {
    popup_elem.hide();
    popup_time = 0 ;
  }
  popup_elem = popup;
  if ( popup_time == 0 ) {
    popup_show_now();
  } else {
    popup_show_timer = setTimeout("popup_show_now();",popup_time);
  }
}


function popup_show_now() {
  popup_show_timer = 0 ;

  if(popup_elem) {
    popup_elem.show();
    clearTimeout(popup_reset_timer);
    popup_time = 0;
  }
}

function popup_clear_show_timer(){
  if (popup_show_timer) {
    clearTimeout(popup_show_timer);
    popup_show_timer = 0;
  }
}

function popup_hide(me,popup) {
  popup_clear_show_timer();
  clearTimeout(popup_reset_timer);

  popup.hide();
  if(popup == popup_elem) {
    popup_elem = 0;
  }
  popup_reset_timer = setTimeout('popup_reset()',Drupal.settings.views_popup.reset_time);
}

function popup_reset(){
  popup_time = Drupal.settings.views_popup.popup_delay;
}



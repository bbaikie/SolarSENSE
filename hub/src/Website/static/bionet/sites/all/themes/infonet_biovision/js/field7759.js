/* Form Field Modifictions*/

(function ($) {
    $(document).ready(function(){

		// Disable default ckeditor on some textareas.
		  Drupal.behaviors.ckeditor_noautostart = {
		    attach: function(context) {
		      // Subheading field off
		      if ($('div.field-name-field-captionimgas').length > 0){
		        if (typeof(Drupal.settings.ckeditor.autostart) != 'undefined' && typeof(Drupal.settings.ckeditor.autostart['edit-field-captionimgas-und-0-value']) != 'undefined') {
		          delete Drupal.settings.ckeditor.autostart['edit-field-captionimgas-und-0-value'];
		          $('div.field-name-field-captionimgas a.ckeditor_links').html('Switch to rich-text editor');
		        }
		      }
		    }
		  }
    });
})(jQuery);
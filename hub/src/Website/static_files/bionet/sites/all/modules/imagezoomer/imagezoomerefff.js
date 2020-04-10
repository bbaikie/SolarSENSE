/* imagezoomer.js file - @created on 02 Oct 2012 / last edited on 30 Jan 2013 by tuan */

(function($){
Drupal.behaviors.imagezoomer = {
  attach: function(context, settings) {
    // Adding Featuredzoomer to images
    $("img.imagezoomer-featured-image").each(function() {
      var image_id = $(this).attr('id');
      
      $("#" + image_id).addimagezoom({
        zoomrange: [Drupal.settings['imagezoomer_featured']['imagezoomer_featured_power_range_low'], Drupal.settings['imagezoomer_featured']['imagezoomer_featured_power_range_high']],
        magnifiersize: [Drupal.settings['imagezoomer_featured']['imagezoomer_featured_magnifier_size_width'], Drupal.settings['imagezoomer_featured']['imagezoomer_featured_magnifier_size_height']],
        magnifierpos: Drupal.settings['imagezoomer_featured']['imagezoomer_featured_magnifier_position'],
        largeimage: $("#" + image_id).attr('zoomingpath')
      });
    });

    // Adding Powerzoomer to images
    $("img.imagezoomer-power-image").each(function() {
      // Get image id
      var image_id = $(this).attr('id').replace(/^imagezoomer\-power\-image\-/, '');
      if (!parseInt(image_id)) {return;}

      // Get largeimage if any
      var zoomer_image = $("#imagezoomer-power-zoom-image-" + image_id);
      var zoomer_image_path = null;
      if (zoomer_image) {
        zoomer_image_path = $(zoomer_image).attr('src');
      }

      // Adding
      if (Drupal.settings['imagezoomer_power'] && Drupal.settings['imagezoomer_power']['image-id-' + image_id]) {
        $(this).addpowerzoom({
          defaultpower: Drupal.settings['imagezoomer_power']['image-id-' + image_id]['imagezoomer_power_default_power'],
          powerrange: [Drupal.settings['imagezoomer_power']['image-id-' + image_id]['imagezoomer_power_power_range_low'], Drupal.settings['imagezoomer_power']['image-id-' + image_id]['imagezoomer_power_power_range_high']],
          largeimage: zoomer_image_path,
          magnifiersize: [Drupal.settings['imagezoomer_power']['image-id-' + image_id]['imagezoomer_power_magnifier_size_width'], Drupal.settings['imagezoomer_power']['image-id-' + image_id]['imagezoomer_power_magnifier_size_height']]
        });
      }
    });
  }
};
})(jQuery);

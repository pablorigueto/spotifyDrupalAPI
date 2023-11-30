(function ($, once) {
  Drupal.behaviors.addHomeMenuLinks = {
    attach(context) {
      // Run this code once
      if (once.addHomeMenuLinks) {
        return;
      }
      once.addHomeMenuLinks = true;

      // Replace Home with /artists.
      $('.path-home #block-dc-breadcrumbs a[href="/"]').attr('href', '/artists').text('Artists');

      // Add a new breadcrumb item /songs.
      const newLink = $('<li><a href="/songs">Songs</a></li>');
      $('.path-home #block-dc-breadcrumbs ol').append(newLink);
    },
  };
})(jQuery, once);

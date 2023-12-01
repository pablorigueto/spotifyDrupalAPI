(function ($, once) {
  Drupal.behaviors.addHomeMenuLinks = {
    attach() {
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

  Drupal.behaviors.addArtistsMenuLinks = {
    attach() {
      // Run this code once
      if (once.addArtistsMenuLinks) {
        return;
      }
      once.addArtistsMenuLinks = true;

      // Replace Home with /home.
      $('.path-artists #block-dc-breadcrumbs a[href="/"]').attr('href', '/home').text('Home');

      // Add a new breadcrumb item /songs.
      const newLink = $('<li><a href="/songs">Songs</a></li>');
      $('.path-artists #block-dc-breadcrumbs ol').append(newLink);
    },
  };

  Drupal.behaviors.addSongsMenuLinks = {
    attach() {
      // Run this code once
      if (once.addSongsMenuLinks) {
        return;
      }
      once.addSongsMenuLinks = true;

      // Replace Home with /artists.
      $('.path-songs #block-dc-breadcrumbs a[href="/"]').attr('href', '/home').text('Home');

      // Add a new breadcrumb item /artists.
      const newLink = $('<li><a href="/artists">Artists</a></li>');
      $('.path-songs #block-dc-breadcrumbs ol').append(newLink);
    },
  };

  Drupal.behaviors.addBackButton = {
    attach(context, settings) {
      // Run this code once
      if (once.addBackButton) {
        return;
      }
      once.addBackButton = true;

      // Create a new div element
      var backButtonDiv = '<div class="node__back"><a href="/home">Back</a></div>';

      // Get the parent element where you want to prepend the new div
      var parentElement = $('.page-node-type-spotify #block-dc-content', context);

      // Prepend the new div to the parent element
      parentElement.prepend(backButtonDiv);
    },
  };

})(jQuery, once);

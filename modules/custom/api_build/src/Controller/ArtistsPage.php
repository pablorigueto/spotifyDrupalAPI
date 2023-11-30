<?php

namespace Drupal\api_build\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Controller routines for ArtistsPage.
 */
class ArtistsPage extends ControllerBase {

  public function artistspage() {
    return [
      '#theme' => 'artists_page_template',
    ];
  }
}

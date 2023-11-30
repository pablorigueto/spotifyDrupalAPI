<?php

namespace Drupal\api_build\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Controller routines for SongPage.
 */
class SongPage extends ControllerBase {

  public function songpage() {
    return [
      '#theme' => 'song_page_template',
    ];
  }
}

<?php

namespace Drupal\api_build\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Controller routines for HomePage.
 */
class HomePage extends ControllerBase {

  public function homepage() {
    return [
      '#theme' => 'home_page_template',
    ];
  }
}

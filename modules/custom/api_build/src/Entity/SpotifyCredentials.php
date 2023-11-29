<?php

namespace Drupal\api_build\Entity;

use Drupal\Core\Config\Entity\ConfigEntityBase;
use Drupal\Core\Config\Entity\ConfigEntityInterface;

/**
 * Defines the Spotify credentials entity.
 *
 * @ConfigEntityType(
 *   id = "spotify_credentials",
 *   label = @Translation("Spotify Credentials"),
 *   config_export = {
 *     "id",
 *     "label",
 *     "client_id",
 *     "client_secret",
 *   },
 *   handlers = {
 *     "list_builder" = "Drupal\Core\Config\Entity\ConfigEntityListBuilder",
 *     "form" = {
 *       "add" = "Drupal\api_build\Form\SpotifyCredentialsForm",
 *       "edit" = "Drupal\api_build\Form\SpotifyCredentialsForm",
 *       "delete" = "Drupal\Core\Entity\EntityDeleteForm"
 *     }
 *   },
 *   config_prefix = "spotify_credentials",
 *   admin_permission = "administer site configuration",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "label",
 *     "uuid" = "uuid"
 *   },
 *   links = {
 *     "canonical" = "/admin/config/spotify-integration/settings/manage/{spotify_credentials}",
 *     "edit-form" = "/admin/config/spotify-integration/settings/manage/{spotify_credentials}/edit",
 *     "delete-form" = "/admin/config/spotify-integration/settings/manage/{spotify_credentials}/delete"
 *   }
 * )
 */
class SpotifyCredentials extends ConfigEntityBase implements ConfigEntityInterface {

  /**
   * The Spotify credentials ID.
   *
   * @var string
   */
  public $id;

  /**
   * The Spotify credentials label.
   *
   * @var string
   */
  public $label;

  /**
   * The Spotify client ID.
   *
   * @var string
   */
  public $client_id;

  /**
   * The Spotify client secret.
   *
   * @var string
   */
  public $client_secret;

}

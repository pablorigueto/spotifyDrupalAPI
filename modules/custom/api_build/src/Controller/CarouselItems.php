<?php

namespace Drupal\api_build\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\Core\Entity\EntityTypeManagerInterface;

/**
 * Controller routines for Spotify data.
 */
class CarouselItems extends ControllerBase {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Constructs a new CarouselItems object.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager) {
    $this->entityTypeManager = $entity_type_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager')
    );
  }

  /**
   * Handles the get Spotify data.
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   A JSON response containing nodes of the "spotify" content type.
   */
  public function getSpotifyNodes() {
    try {
      // Load all nodes of type 'spotify'.
      $query = $this->entityTypeManager->getStorage('node')->getQuery()
        ->condition('type', 'spotify')
        ->accessCheck(FALSE);
      $nids = $query->execute();

      // Load node entities using the entity type manager.
      $nodes = $this->entityTypeManager->getStorage('node')->loadMultiple($nids);

      // Prepare an array to store node fields.
      $spotifyData = [];

      // Loop through nodes and extract desired fields.
      foreach ($nodes as $node) {
        $spotifyData[] = [
          'node_id' => $node->id(),
          'title' => $node->getTitle(),
          'track_added_at' => $node->get('track_added_at')->value,
          'track_album_image_url' => $node->get('track_album_image_url')->value,
          'track_album_type' => $node->get('track_album_type')->value,
          'track_artist_id' => $node->get('track_artist_id')->value,
          'track_artist_name' => $node->get('track_artist_name')->value,
          'track_id' => $node->get('track_id')->value,
          'track_main_genre' => $node->get('track_main_genre')->value,
          'track_name' => $node->get('track_name')->value,
          'track_number' => $node->get('track_number')->value,
          'track_popularity' => $node->get('track_popularity')->value,
        ];
      }

      return new JsonResponse($spotifyData);
    } catch (\Exception $e) {
      return new JsonResponse(['error' => $e->getMessage()], 500);
    }
  }
}

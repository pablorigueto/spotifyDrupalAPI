<?php

namespace Drupal\api_build\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\node\Entity\Node;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Core\Entity\EntityTypeManagerInterface;

/**
 * Controller routines for Spotify data.
 */
class SpotifyDataController extends ControllerBase {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Constructs a new SpotifyDataController object.
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
   * Handles the submission of Spotify data.
   *
   * @param array $data
   *   The Spotify data to be saved.
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   A JSON response indicating the success or failure of the operation.
   */
  public function submitSpotifyData(Request $request) {
    try {
      // Count existing nodes of type 'spotify'.
      $query = $this->entityTypeManager->getStorage('node')->getQuery()
        ->condition('type', 'spotify')
        ->accessCheck(FALSE);
      $count = $query->count()->execute();

      // Check if the count is less than 20.
      if ($count >= 20) {
        return new JsonResponse(['error' => 'Cannot save more than 20 Spotify nodes.'], 400);
      }

      $data = json_decode($request->getContent(), true);

      foreach ($data['data'] as $trackData) {
        // Create a new node of type 'spotify'.
        $node = Node::create([
          'type' => 'spotify',
          'title' => $trackData['track_name'],
          'field_track_added_at' => $trackData['track_added_at'],
          'field_track_album_image_url' => $trackData['track_album_image_url'],
          'field_track_album_type' => $trackData['album_type'],
          'field_track_artist_id' => $trackData['artist_id'],
          'field_track_artist_name' => $trackData['artist_name'],
          'field_track_id' => $trackData['track_id'],
          'field_track_main_genre' => $trackData['track_main_genre'],
          'field_track_name' => $trackData['track_name'],
          'field_track_number' => $trackData['track_number'],
          'field_track_popularity' => $trackData['popularity'],
        ]);

        $node->save();
      }

      return new JsonResponse(['message' => 'Spotify data saved successfully.']);
    } catch (\Exception $e) {
      return new JsonResponse(['error' => $e->getMessage()], 500);
    }
  }

}

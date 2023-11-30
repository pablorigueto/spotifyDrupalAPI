<?php

namespace Drupal\api_build\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\node\Entity\Node;
use Symfony\Component\HttpFoundation\Request;

/**
 * Controller routines for Spotify data.
 */
class SpotifyDataController extends ControllerBase {

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

      $data = json_decode($request->getContent(), true);

      // Create a new node of type 'spotify'.
      $node = Node::create([
        'type' => 'spotify',
        'title' => $data['track_name'], // You can set the title to the track name or any other relevant information.
        'field_track_added_at' => $data['track_added_at'],
        'field_track_album_image_url' => $data['track_album_image_url'],
        'field_track_album_type' => $data['track_album_type'],
        'field_track_artist_id' => $data['track_artist_id'],
        'field_track_artist_name' => $data['track_artist_name'],
        'field_track_id' => $data['track_id'],
        'field_track_main_genre' => $data['track_main_genre'],
        'field_track_name' => $data['track_name'],
        'field_track_number' => $data['track_number'],
        'field_track_popularity' => $data['track_popularity'],
      ]);

      // Save the node.
      $node->save();

      return new JsonResponse(['message' => 'Spotify data saved successfully.']);
    } catch (\Exception $e) {
      return new JsonResponse(['error' => $e->getMessage()], 500);
    }
  }

}

<?php

namespace Drupal\api_build\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Psr\Log\LoggerInterface;
use GuzzleHttp\ClientInterface;

/**
 * Controller for Last FM integration.
 */
class LastFMController extends ControllerBase {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The logger.
   *
   * @var \Psr\Log\LoggerInterface
   */
  protected $logger;

  /**
   * The HTTP client.
   *
   * @var \GuzzleHttp\ClientInterface
   */
  protected $httpClient;

  /**
   * The Last FM API URL.
   *
   * @var string
   */
  const LASTFM_API_URL = 'http://ws.audioscrobbler.com/2.0';

  /**
   * The Last FM API Key.
   *
   * @var string
   */
  const LASTFM_API_KEY = 'f344fe81f6ab8cc8adccb7f8c3d6f48b';

  /**
   * Constructs a new SpotifyController object.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager service.
   * @param \Psr\Log\LoggerInterface $logger
   *   The logger service.
   * @param \GuzzleHttp\ClientInterface $httpClient
   *   The Guzzle HTTP client service.
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager, LoggerInterface $logger, ClientInterface $httpClient) {
    $this->entityTypeManager = $entity_type_manager;
    $this->logger = $logger;
    $this->httpClient = $httpClient;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container): self {
    return new static(
      $container->get('entity_type.manager'),
      $container->get('logger.channel.default'),
      $container->get('http_client')
    );
  }

  public function getGenreFromLastfmAPI($artistName, $trackName) {
    try {
      $params = [
        'method' => 'track.getInfo',
        'api_key' => self::LASTFM_API_KEY,
        'artist' => $artistName,
        'track' => $trackName,
        'format' => 'json',
      ];

      // Make a POST request to Last.fm API using Drupal HTTP client.
      $response = $this->httpClient->post(self::LASTFM_API_URL, [
        'form_params' => $params,
      ]);

      // Check if the response status code is not successful.
      if ($response->getStatusCode() !== 200) {
        // Handle other non-successful status codes here.
        return new JsonResponse(['error' => 'Unexpected response from Last.fm API'], $response->getStatusCode());
      }

      // Decode the JSON response.
      $data = json_decode($response->getBody()->getContents(), TRUE);

      // Check if there is an error in the Last.fm API response.
      if (isset($data['error']) && $data['error']['message'] === 'Track not found') {
        return new JsonResponse(['error' => 'Track not found'], 404);
      }

      // Check if there is any other error in the Last.fm API response.
      if (isset($data['error'])) {
        return new JsonResponse(['error' => $data['error']['message']], $response->getStatusCode());
      }

      // Extract tags from the Last.fm API response.
      $toptags = $data['track']['toptags']['tag'];

      // Check if there are tags.
      if (empty($toptags)) {
        return new JsonResponse(['error' => 'No tags found for the track'], 404);
      }

      // Extract the first genre.
      $firstGenre = $toptags[0]['name'];

      // Return JSON response with the first genre.
      return new JsonResponse(['genre' => $firstGenre]);

    }
    catch (\Exception $e) {
      $this->logger->error('Error fetching Last FM access token: @message', ['@message' => $e->getMessage()]);
      return new JsonResponse(['error' => 'Internal Server Error'], 500);
    }
  }

}

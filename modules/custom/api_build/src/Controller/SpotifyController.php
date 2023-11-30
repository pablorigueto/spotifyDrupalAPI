<?php

namespace Drupal\api_build\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Psr\Log\LoggerInterface;
use GuzzleHttp\ClientInterface;

/**
 * Controller for Spotify integration.
 */
class SpotifyController extends ControllerBase {

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
   * The Spotify API URL.
   *
   * @var string
   */
  const SPOTIFY_API_URL = 'https://accounts.spotify.com/api/token';

  /**
   * The Spotify Client ID.
   *
   * @var string
   */
  const SPOTIFY_CLIEND_ID = 'e5e1d9df66c24af197beb3b9b020fd21';

  /**
   * The Spotify Client Secret.
   *
   * @var string
   */
  const SPOTIFY_CLIENT_SECRET = '06928943983843c489f6f5e21cc6be63';

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

  /**
   * Returns the Spotify access token.
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   The JSON response.
   */
  public function getSpotifyAccessToken(): JsonResponse {
    try {
      $entities = $this->entityTypeManager->getStorage('spotify_credentials')->loadMultiple();

      // If the user not set the keys, use this one to test.
      if (empty($entities)) {
        $clientId = self::SPOTIFY_CLIEND_ID;
        $clientSecret = self::SPOTIFY_CLIENT_SECRET;
      }

      // Check if any entities were loaded.
      if ($entity = reset($entities)) {
        $clientId = $entity->get('client_id');
        $clientSecret = $entity->get('client_secret');
      }

      // Make a request to the Spotify API to obtain the access token.
      $response = $this->httpClient->post(self::SPOTIFY_API_URL, [
        'form_params' => [
          'grant_type' => 'client_credentials',
          'scope' => 'user-top-read',
        ],
        'headers' => [
          'Content-Type' => 'application/x-www-form-urlencoded',
          'Authorization' => 'Basic ' . base64_encode("$clientId:$clientSecret"),
        ],
      ]);

      // In the future (with PHP 8.3) this json_decode should be changed by json_validate which is more faster.
      $data = json_decode($response->getBody()->getContents(), TRUE);

      return new JsonResponse(['access_token' => $data['access_token']]);
    }
    catch (\Exception $e) {
      $this->logger->error('Error fetching Spotify access token: @message', ['@message' => $e->getMessage()]);
      return new JsonResponse(['error' => 'Internal Server Error'], 500);
    }
  }
}

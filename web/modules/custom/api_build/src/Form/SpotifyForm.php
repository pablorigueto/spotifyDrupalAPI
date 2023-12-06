<?php

namespace Drupal\api_build\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\api_build\Entity\SpotifyCredentials;

/**
 * Provides a form for entering Spotify API credentials.
 */
class SpotifyForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'api_build_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
   // Get the existing credentials from the database.
   $credentials = SpotifyCredentials::loadMultiple();

   // Set default values for the form fields if credentials exist.
   $default_values = [];
   if (!empty($credentials)) {
     $first_credentials = reset($credentials);
     $default_values['client_id'] = $first_credentials->get('client_id');
     $default_values['client_secret'] = $first_credentials->get('client_secret');
   }

    // Add a title to the form.
    $form['#title'] = $this->t('Spotify Credentials Form');

    $form['client_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Client ID'),
      '#required' => TRUE,
      '#default_value' => $default_values['client_id'] ?? '',
    ];

    $form['client_secret'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Client Secret'),
      '#required' => TRUE,
      '#default_value' => $default_values['client_secret'] ?? '',
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Submit'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

    $client_id = $form_state->getValue('client_id');
    $client_secret = $form_state->getValue('client_secret');
  
    // Get the existing entity or create a new one.
    $entity = SpotifyCredentials::create([
      'label' => 'Spotify Credentials',
      'client_id' => $client_id,
      'client_secret' => $client_secret,
    ]);
  
    // If the entity doesn't have an ID, set a unique ID.
    if (!$entity->id()) {
      $entity->set('id', \Drupal::service('uuid')->generate());
    }
  
    // Save the entity.
    $entity->save();
  
    // Display a success message.
    $this->messenger()->addMessage($this->t('Spotify credentials saved successfully.'));
  }

}

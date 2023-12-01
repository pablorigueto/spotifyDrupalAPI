import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getAccessToken, getTopHitsPlaylistId, getTopTracksWithGenres } from './controller';

const fetchSpotifyData = async () => {
  const accessToken = await getAccessToken();
  const topHitsPlaylistId = await getTopHitsPlaylistId(accessToken);
  const tracksData = await getTopTracksWithGenres(accessToken, topHitsPlaylistId);

  return tracksData;
};


const SpotifyDataComponent = () => {
  const { data, isLoading } = useQuery('spotifyData', fetchSpotifyData, {
    retry: 5,
  });

  const currentPath = window.location.pathname;

  useEffect(() => {
    handleSendDataToDrupal();
  }, [data]);

  const sendSpotifyDataToDrupal = async (spotifyData) => {
    try {

      const baseUrl = window.location.origin;
      const sendDataEndpoint = `${baseUrl}/submit-spotify-data`;
      const response = await fetch(sendDataEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: spotifyData }),
      });

      if (response.ok) {
        console.log('Spotify data sent successfully');
        // Reload the page on success to avoid more complexity with Cron and etc.
        window.location.href = 'home';
      }
      else {
        // Help to debug.
        const errorResponse = await response.json();
        if (errorResponse && errorResponse.error) {
          // Check for a specific error message
          if (errorResponse.error === 'Cannot save more than 50 Spotify nodes.') {
            window.location.href = 'home';
          }
          else {
            console.error('Unexpected error:', errorResponse.error);
          }
        }
        else {
          console.error('Unexpected error format:', errorResponse);
        }
      }
    } catch (error) {
      console.error('Error sending Spotify data:', error.message);
    }
  };

  const handleSendDataToDrupal = () => {

    if (data) {
      
      const formattedData = data.map((track) => ({
        
        track_name: track.track.name,
        track_added_at: track.added_at,
        track_album_image_url: track.track.album.images[0].url,
        track_id: track.track.id,
        album_type: track.track.album.album_type,
        album_url: track.track.album.external_urls.spotify,
        artist_id: track.track.artists[0].id,
        artist_name: track.track.artists[0].name,
        popularity: track.track.popularity,
        track_number: track.track.track_number,
        genre: track.genre,
        followers: track.followers,
        artist_image: track.artist_image,
        artist_popularity: track.artist_popularity
      }));
      // Call the function to send data to Drupal.
      sendSpotifyDataToDrupal(formattedData);
    }
  };

  // if (isLoading && !data && currentPath === '/') {
  //   return <p>Getting data from Spotify API...</p>;
  // }

  return (
    <>
      {currentPath === '/' ? (
        <p>Getting data from Spotify API...</p>
      ) : null}
   </>
  );
};

export default SpotifyDataComponent;

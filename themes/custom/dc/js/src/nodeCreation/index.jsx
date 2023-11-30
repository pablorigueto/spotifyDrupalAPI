import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getAccessToken, getTopHitsPlaylistId, getTopTracks } from './controller';
import fetchLastfmGenres from '../getGenre';

const fetchSpotifyData = async () => {
  const accessToken = await getAccessToken();
  const topHitsPlaylistId = await getTopHitsPlaylistId(accessToken);
  const tracksData = await getTopTracks(accessToken, topHitsPlaylistId);

  return tracksData;
};

const SpotifyDataComponent = () => {
  const { data, isLoading } = useQuery('spotifyData', fetchSpotifyData, {
    retry: 5,
  });

  const [lastfmGenres, setLastfmGenres] = useState([]);

  useEffect(() => {
    fetchLastfmGenres(data, setLastfmGenres);
  }, [data]);

  useEffect(() => {
    // This effect will run when data is loaded, including the lastfmGenres.
    if (!isLoading && data && data.items) {
      handleSendDataToDrupal();
    }
  }, [lastfmGenres]);

  const currentPath = window.location.pathname;

  const sendSpotifyDataToDrupal = async (spotifyData) => {
    try {

      // Check if the current path is the root path.
      if (currentPath !== '/') {
        return;
      }

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
        window.location.reload();
      }
      else {
        // Help to debug.
        const errorResponse = await response.json();
        if (errorResponse && errorResponse.error) {
          // Check for a specific error message
          if (errorResponse.error === 'Cannot save more than 20 Spotify nodes.') {
            // Handle the specific error here, for example, display a message to the user.
            console.log('The Top 20 list of Spotify its ok, enjoy!');
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
    if (data && data.items) {
      const formattedData = data.items.map((track) => ({
        track_name: track.track.name,
        track_added_at: track.added_at,
        track_album_image_url: track.track.album.images[0].url,
        track_id: track.track.id,
        album_type: track.track.album.album_type,
        artist_id: track.track.artists[0].id,
        artist_name: track.track.artists[0].name,
        popularity: track.track.popularity,
        track_number: track.track.track_number,
        genre: lastfmGenres[data.items.indexOf(track)] || 'N/A',
      }));

      // Call the function to send data to Drupal.
      sendSpotifyDataToDrupal(formattedData);
    }
  };

  if (isLoading && !data && currentPath === '/') {
    return <p>Getting data from Spotify API...</p>;
  }

  return (
    <>
      {currentPath === '/' ? (
        <p className='hasTimeToLottieOrNot' style={{ height: '18px' }}></p>
      ) : null}
   </>
  );
};

export default SpotifyDataComponent;

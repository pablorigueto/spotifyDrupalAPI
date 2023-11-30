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
  const { data, isLoading, isError } = useQuery('spotifyData', fetchSpotifyData, {
    retry: 5,
  });

  const [lastfmGenres, setLastfmGenres] = useState([]);

  useEffect(() => {
    fetchLastfmGenres(data, setLastfmGenres);
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
      }
      else {
        console.error('Failed to send Spotify data to Drupal. Status:', response.status);
        const errorMessage = await response.text();
        console.error('Error message:', errorMessage);
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
      }));
  
      // Call the function to send data to Drupal
      sendSpotifyDataToDrupal(formattedData);
    }
  };

  if (isLoading && !data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Hello there - world!</h1>
      {isError && <p style={{ color: 'red' }}>Error fetching data. Please try again later.</p>}
      {data && (
        <div>
          <h2>Top 20 Tracks</h2>
          {data.items.map((track, index) => (
            <div key={index}>
              <p>{track.track.name}</p>
              <img src={track.track.album.images[0].url} alt={track.track.name} />
              <div>Genre: {lastfmGenres[index] || 'N/A'}</div>
            </div>
          ))}
          <button onClick={handleSendDataToDrupal}>Send Data to Drupal</button>
        </div>
      )}
    </div>
  );
};

export default SpotifyDataComponent;

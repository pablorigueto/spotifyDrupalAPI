import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getAccessToken, getTopHitsPlaylistId, getTopTracks } from './controller';
import fetchLastfmGenres from '../getGenre';

const SpotifyDataComponent = () => {
  const { data, isLoading, isError } = useQuery('spotifyData', async () => {
    const accessToken = await getAccessToken();
    const topHitsPlaylistId = await getTopHitsPlaylistId(accessToken);
    const tracksData = await getTopTracks(accessToken, topHitsPlaylistId);

    return tracksData;
  });

  const [lastfmGenres, setLastfmGenres] = useState([]);

  useEffect(() => {
    fetchLastfmGenres(data, setLastfmGenres);
  }, [data]);

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

              <div> Track ID: { track.track.id } </div>

              <div> Added At: { track.added_at } </div>

              <div> Album Type: { track.track.album.album_type } </div>

              <div> Artists ID: { track.track.artists[0].id } </div>
              <div> Artists Name: { track.track.artists[0].name } </div>

              <div> Music ID: { track.track.id } </div>
              <div> Music Name: { track.track.name } </div>
              <div> Music Popularity: { track.track.popularity } </div>
              <div> Music Number: { track.track.track_number } </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpotifyDataComponent;

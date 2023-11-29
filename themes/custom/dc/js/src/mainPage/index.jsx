import React from 'react';
import { useQuery } from 'react-query';
import { getAccessToken, getTopHitsPlaylistId, getTopTracks } from './controller';

const SpotifyDataComponent = () => {

  const { data, isLoading, isError } = useQuery('spotifyData', async () => {
    const accessToken = await getAccessToken();
    const topHitsPlaylistId = await getTopHitsPlaylistId(accessToken);
    const tracksData = await getTopTracks(accessToken, topHitsPlaylistId);

    return tracksData;
  });

  return (
    <div>
      <h1>Hello there - world!</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p style={{ color: 'red' }}>Error fetching data. Please try again later.</p>}
      {data && (
        <div>
          <h2>Top 20 Tracks</h2>
          {data.items.map((track, index) => (
            <div key={index}>
              <p>{track.track.name}</p>
              {/* Add more details about the track as needed */}
              <img src={track.track.album.images[0].url} alt={track.track.name} />
              <a href={`/track/${track.track.id}`}>Details</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpotifyDataComponent;

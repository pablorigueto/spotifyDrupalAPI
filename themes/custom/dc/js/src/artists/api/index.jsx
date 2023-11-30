import React, { useEffect, useState } from 'react';
import useSpotifyData from '../../getNodes';
import { getAccessToken, getArtistDetails } from './controller';

const SpotifyCarousel = () => {
  const { data: tracks, isLoading, error: tracksError } = useSpotifyData();
  const [artistsData, setArtistsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchArtists = async () => {
      try {
        if (!tracks || tracks.length === 0) {
          return;
        }

        const accessToken = await getAccessToken();

        const artistsPromises = tracks.map((track) => {
          return getArtistDetails(accessToken, track.track_artist_id);
        });

        const artistsData = await Promise.all(artistsPromises);

        // Sorting artistsData by artist name in ascending order
        artistsData.sort((a, b) => a.name.localeCompare(b.name));

        if (isMounted) {
          setArtistsData(artistsData);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message || 'An error occurred while fetching artist data');
        }
      }
    };

    fetchArtists();

    return () => {
      isMounted = false;
    };

  }, [tracks]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (tracksError) {
    return <p>Error loading tracks: {tracksError}</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="home__title">
        <h1>Top Artists of Spotify</h1>
      </div>
      {artistsData.map((artist, index) => (
        <div key={index}>
          <div>
            <img src={artist.images[0].url} alt={`Artist name ${artist.name}`} />
          </div>

          <h2>{artist.name}</h2>

          <div className='details'>
            <div>
              <h4>Genre: </h4>
            </div>
            <div>
              {artist.genres[0]}
            </div>

            <div>
              <h4>Followers: </h4>
            </div>
            <div>
              {artist.followers.total}
            </div>

            <div>
              <h4>Popularity: </h4>
            </div>
            <div>
              {artist.popularity}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SpotifyCarousel;

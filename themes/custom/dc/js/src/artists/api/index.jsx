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
      {artistsData.map((artist, index) => (
        <div key={index} className='details__spotify__card'>
          <div className='details__spotify__image'>
            <img src={artist.images[0].url} alt={`Artist name ${artist.name}`} />
          </div>
          <h2>{artist.name}</h2>

          <div className='details__spotify'>

            <div className='spotify__card__details'>
              <div className='title'>
                <p>Genre: </p>
              </div>
              <div className='info'>
                {artist.genres[0]}
              </div>
            </div>

            <div className='spotify__card__details'>
              <div className='title'>
                <p>Followers: </p>
              </div>
              <div className='info'>
                {artist.followers.total}
              </div>
            </div>
            <div className='spotify__card__details'>
              <div className='info'>
                <p>Popularity: </p>
              </div>
              <div className='info'>
                {artist.popularity}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SpotifyCarousel;

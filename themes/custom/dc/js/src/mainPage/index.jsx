import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getAccessToken, getTopHitsPlaylistId, getTopTracks } from './controller';
import fetchLastfmGenres from '../getGenre';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

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

  // Slick Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <h1>Hello there - world!</h1>
      {isError && <p style={{ color: 'red' }}>Error fetching data. Please try again later.</p>}
      {data && (
        <div>
          <h2>Top 20 Tracks</h2>
          {/* Wrap your tracks in the Carousel component */}
          <Carousel>
            {data.items.map((track, index) => (
              <div key={index}>
                <p>{track.track.name}</p>

                <img src={track.track.album.images[0].url} alt={track.track.name} />

                <div>Genre: {lastfmGenres[index] || 'N/A'}</div>

                {/* Include other track information as needed */}
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default SpotifyDataComponent;

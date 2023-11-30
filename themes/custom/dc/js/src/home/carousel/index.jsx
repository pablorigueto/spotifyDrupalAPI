// index.jsx
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import useSpotifyData from './controller';

const SpotifyCarousel = () => {
  const { data, isLoading, error } = useSpotifyData();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="home__title">
        <h1>Top 20 Songs of Spotify</h1>
      </div>
      <Carousel>
        {data.map((track, index) => (
          <div key={index}>
            <h2>{track.track_name}</h2>
            <img alt={`Slide ${index + 1}`} src={track.track_album_image_url} />
            <a href={`/node/${track.node_id}`}>
              <p className="legend">
                View more: {track.track_name} - {track.track_artist_name}
              </p>
            </a>
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default SpotifyCarousel;

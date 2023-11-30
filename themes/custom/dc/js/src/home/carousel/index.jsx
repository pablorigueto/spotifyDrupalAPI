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
    <Carousel>
      {data.map((track, index) => (
        <div key={index}>
          <img alt={`Slide ${index + 1}`} src={track.track_album_image_url} />
          <a href={`/node/${track.node_id}`}>
            <p className="legend">
              View more: {track.track_name} - {track.track_artist_name}
            </p>
          </a>
        </div>
      ))}
    </Carousel>
  );
};

export default SpotifyCarousel;

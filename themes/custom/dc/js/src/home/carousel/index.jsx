// index.jsx
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import fetchSpotifyData from './controller';

const SpotifyCarousel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const spotifyData = await fetchSpotifyData();
        setData(spotifyData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Carousel>
      {data.map((track, index) => (
        <div>
          <img alt={`Slide ${index + 1}`} src={track.track_album_image_url} />
          <a key={index} href={`/node/${track.node_id}`}>
            <p className="legend">
              See more about: {track.track_name} - {track.track_artist_name}
            </p>
          </a>
        </div>
      ))}
    </Carousel>

  );
};

export default SpotifyCarousel;
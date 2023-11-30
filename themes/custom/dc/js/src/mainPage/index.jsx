// SpotifyCarouselComponent.jsx

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import useCarouselItems from './useCarouselItems';

const SpotifyCarouselComponent = () => {
  const { data: carouselItems, isLoading, isError } = useCarouselItems();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading carousel items</p>;
  }

  return (
    <Carousel>
      {carouselItems.map((item, index) => (
        <div key={index}>
          {/* Customize your carousel item here */}
          <img src={item.imageUrl} alt={`Carousel Item ${index + 1}`} />
          <p className="legend">{item.title}</p>
          <p>{item.description}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default SpotifyCarouselComponent;

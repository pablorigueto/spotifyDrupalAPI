// SpotifyCarouselComponent.jsx

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CarouselItems from './controller';

const SpotifyCarouselComponent = () => {
  return (
    <Carousel>
      {CarouselItems.map((item, index) => (
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

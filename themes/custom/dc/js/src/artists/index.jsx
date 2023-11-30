import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
//import SpotifyDataComponent from './nodeCreation';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <p>artistspage Only test</p>

    </QueryClientProvider>
  );
};

// Find the element with ID 'artistspage' and check if it's.
const homeCarousel = document.getElementById('artistspage');

// Check if the element exists before rendering.
if (homeCarousel) {
  ReactDOM.render(<App />, homeCarousel);
}

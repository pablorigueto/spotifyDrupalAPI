import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
//import SpotifyDataComponent from './nodeCreation';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <p>Songpage Only test</p>

    </QueryClientProvider>
  );
};

// Find the element with ID 'songpage'.
const homeCarousel = document.getElementById('songpage');

// Check if the element exists before rendering.
if (homeCarousel) {
  ReactDOM.render(<App />, homeCarousel);
}

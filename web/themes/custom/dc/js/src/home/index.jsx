import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import SpotifyCarousel from './carousel';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SpotifyCarousel/>
    </QueryClientProvider>
  );
};

// Find the element with ID 'block-dc-page-title' and check if it's the front page.
const homeCarousel = document.getElementById('homepage');

// Check if the element exists before rendering.
if (homeCarousel) {
  ReactDOM.render(<App />, homeCarousel);
}

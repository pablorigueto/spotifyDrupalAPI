import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
//import SpotifyDataComponent from './nodeCreation';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <p>Only test</p>

    </QueryClientProvider>
  );
};

// Find the element with ID 'block-dc-page-title' and check if it's the front page.
const homeCarousel = document.getElementById('homepage');

// Check if the element exists before rendering.
if (homeCarousel) {
  ReactDOM.render(<App />, homeCarousel);
}

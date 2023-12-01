import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import SpotifySongs from './getItems';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SpotifySongs/>
    </QueryClientProvider>
  );
};

// Find the element with ID 'songpage'.
const homeCarousel = document.getElementById('songpage');

// Check if the element exists before rendering.
if (homeCarousel) {
  ReactDOM.render(<App />, homeCarousel);
}

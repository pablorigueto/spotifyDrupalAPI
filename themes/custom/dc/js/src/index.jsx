import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import SpotifyDataComponent from './nodeCreation';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SpotifyDataComponent />
    </QueryClientProvider>
  );
};

// Find the element with ID 'block-dc-page-title' and check if it's the front page.
const loadingData = document.getElementById('loading-data');
const isFrontPage = document.body.classList.contains('path-frontpage');

// Check if the element exists before rendering.
if (isFrontPage && loadingData) {
  ReactDOM.render(<App />, loadingData);
}

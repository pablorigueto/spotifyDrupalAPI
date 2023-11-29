import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import SpotifyDataComponent from './mainPage';

// Create a new QueryClient instance
const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <SpotifyDataComponent />
  </QueryClientProvider>,
  document.getElementById('block-dc-page-title')
);

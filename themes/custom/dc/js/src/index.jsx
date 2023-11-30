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
const blockDcPageTitleElement = document.getElementById('block-dc-page-title');
const isFrontPage = document.body.classList.contains('path-frontpage');

// Check if the element exists before rendering.
if (isFrontPage && blockDcPageTitleElement) {
  ReactDOM.render(<App />, blockDcPageTitleElement);
}

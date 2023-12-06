import axios from 'axios';
import { useQuery } from 'react-query';

const fetchSpotifyData = async () => {
  try {
    const baseUrl = window.location.origin;
    const response = await axios.get(`${baseUrl}/api/getSpotifyNode`);

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    throw error;
  }
};

const useSpotifyData = () => {
  return useQuery('spotifyData', fetchSpotifyData, {
    retry: 5,
    retryDelay: 1000,
  });
};

export default useSpotifyData;

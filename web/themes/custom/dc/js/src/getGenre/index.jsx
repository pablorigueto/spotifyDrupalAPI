import axios from 'axios';

export const getAccessToken = async () => {
  try {
    const baseUrl = window.location.origin;
    const tokenResponse = await axios.get(`${baseUrl}/api/getSpotifyAccessToken`);
    return tokenResponse.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};

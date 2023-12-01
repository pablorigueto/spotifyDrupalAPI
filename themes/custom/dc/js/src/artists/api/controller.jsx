// controller.js
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

export const getArtistDetails = async (accessToken, artistId) => {
  try {
    const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        country: 'US',
      },
    });
    return artistResponse.data;
  } catch (error) {
    console.error('Error fetching artist details:', error);
    throw error;
  }
};

// controller.js
import axios from 'axios';

const fetchSpotifyData = async () => {
  try {
    const baseUrl = window.location.origin;
    console.log(baseUrl);
    const response = await axios.get(`${baseUrl}/api/getSpotifyNode`);
    return response.data; // Assuming your data is in the response.data
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    throw error; // You can handle the error in your component
  }
};

export default fetchSpotifyData;

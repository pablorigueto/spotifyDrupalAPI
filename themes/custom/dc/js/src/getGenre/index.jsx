
// const fetchLastfmGenres = async (data, setLastfmGenres) => {
//   if (data && data.items) {
//     const genresPromises = data.items.map(async (track) => {
//     const baseUrl = window.location.href;
//     const lastFMURI = `${baseUrl}lastfm-api/`;
//       try {
//         const response = await fetch(`${lastFMURI}${encodeURIComponent(track.track.artists[0].name)}/${encodeURIComponent(track.track.name)}`);
//         const data = await response.json();
//         return data.genre;
//       } catch (error) {
//         console.error('Error fetching Last.fm genres:', error);
//         return null;
//       }
//     });

//     const genres = await Promise.all(genresPromises);
//     setLastfmGenres((prevGenres) => [...prevGenres, ...genres.filter((genre) => genre !== null)]);
//   }
// };

// export default fetchLastfmGenres;


// controller.js
import axios from 'axios';

export const getAccessToken = async () => {
  try {
    const baseUrl = window.location.origin;
    const tokenResponse = await axios.get(`${baseUrl}/api/getSpotifyAccessToken`);
    return tokenResponse.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error; // Rethrow the error to be caught by the component
  }
};



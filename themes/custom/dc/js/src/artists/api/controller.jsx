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

export const fetchArtists = async (tracks, sortOrder, filter, setArtistsData, setError, isMounted) => {
  try {
    if (!tracks || tracks.length === 0) {
      return;
    }

    const accessToken = await getAccessToken();

    const artistsPromises = tracks.map((track) => {
      return getArtistDetails(accessToken, track.track_artist_id);
    });

    const artistsData = await Promise.all(artistsPromises);

    // Create a temporary object to store unique IDs.
    const uniqueIds = {};

    // Use Array.filter() to filter out duplicates based on the 'id' property.
    const uniqueArtistsData = artistsData.filter(artist => {
      // If the ID is not in the temporary object, add it and keep the artist.
      if (!uniqueIds[artist.id]) {
        uniqueIds[artist.id] = true;
        return true;
      }
      // If the ID is already in the temporary object, skip the artist.
      return false;
    });

    // Sorting artistsData by artist name
    uniqueArtistsData.sort((a, b) => {
      const compareValue = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    // Filtering artistsData
    const filteredArtistsData = uniqueArtistsData.filter((artist) => {
      const nameMatch = artist.name.toLowerCase().includes(filter.name.toLowerCase());
      const genreMatch = artist.genres.some((genre) => genre.toLowerCase().includes(filter.genre.toLowerCase()));
      const popularityMatch = artist.popularity >= filter.popularity;

      return nameMatch && genreMatch && popularityMatch;
    });

    if (isMounted) {
      setArtistsData(filteredArtistsData);
    }
  } catch (error) {
    if (isMounted) {
      setError(error.message || 'An error occurred while fetching artist data');
    }
  }
};

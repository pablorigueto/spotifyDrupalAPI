import axios from 'axios';

export const getAccessToken = async () => {
  const baseUrl = window.location.href;
  const tokenResponse = await axios.get(`${baseUrl}/api/getSpotifyAccessToken`);
  return tokenResponse.data.access_token;
};

export const getTopHitsPlaylistId = async (accessToken) => {
  const playlistResponse = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      country: 'US',
    },
  });

  const desiredPlaylistName = "Today’s Top Hits";
  const desiredPlaylist = playlistResponse.data.playlists.items.find(
    (playlist) => playlist.name === desiredPlaylistName
  );

  if (!desiredPlaylist) {
    throw new Error(`Playlist "${desiredPlaylistName}" not found.`);
  }

  return desiredPlaylist.id;
};

export const getTopTracksWithGenres = async (accessToken, playlistId) => {
  const response = await getTopTracks(accessToken, playlistId);

  // Extracting relevant information for each track.
  const tracksWithGenres = await Promise.all(
    response.items.map(async (track) => {
      const artistId = track.track.artists[0].id;
      const artistDetails = await getArtistDetails(accessToken, artistId);
      // Adding genre information to the track.
      return {
        ...track,
        genre: artistDetails.genres[0],
        followers: artistDetails.followers.total,
        artist_image: artistDetails.images[0].url,
        artist_popularity: artistDetails.popularity,
      };
    })
  );

  //console.log(tracksWithGenres)
  return tracksWithGenres;
};

export const getTopTracks = async (accessToken, playlistId) => {
  const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      limit: 50,
    },
  });

  return response.data;
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

export const sendSpotifyDataToDrupal = async (spotifyData) => {
  try {
    const baseUrl = window.location.origin;
    const sendDataEndpoint = `${baseUrl}/submit-spotify-data`;
    const response = await fetch(sendDataEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: spotifyData }),
    });

    if (response.ok) {
      console.log('Spotify data sent successfully');
      // Reload the page on success to avoid more complexity with Cron and etc.
      window.location.href = 'home';
    } else {
      // Help to debug.
      const errorResponse = await response.json();
      if (errorResponse && errorResponse.error) {
        // Check for a specific error message
        if (errorResponse.error === 'Cannot save more than 50 Spotify nodes.') {
          window.location.href = 'home';
        } else {
          console.error('Unexpected error:', errorResponse.error);
        }
      } else {
        console.error('Unexpected error format:', errorResponse);
      }
    }
  } catch (error) {
    console.error('Error sending Spotify data:', error.message);
  }
};

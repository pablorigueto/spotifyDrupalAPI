import axios from 'axios';

export const getAccessToken = async () => {
  const tokenResponse = await axios.get('https://jobsity.lndo.site/api/getSpotifyAccessToken');
  return tokenResponse.data.access_token;
};

export const getTopHitsPlaylistId = async (accessToken) => {
  const playlistResponse = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      country: 'US',
      timestamp: new Date().toISOString(),
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

export const getTopTracks = async (accessToken, playlistId) => {
  const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      limit: 20,
    },
  });

  return response.data;
};

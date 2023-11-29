const fetchLastfmGenres = async (data, setLastfmGenres) => {
  if (data && data.items) {
    const genresPromises = data.items.map(async (track) => {
    const baseUrl = window.location.href;
    const lastFMURI = `${baseUrl}lastfm-api/`;
      try {
        const response = await fetch(`${lastFMURI}${encodeURIComponent(track.track.artists[0].name)}/${encodeURIComponent(track.track.name)}`);
        const data = await response.json();
        return data.genre;
      } catch (error) {
        console.error('Error fetching Last.fm genres:', error);
        return null;
      }
    });

    const genres = await Promise.all(genresPromises);
    setLastfmGenres((prevGenres) => [...prevGenres, ...genres.filter((genre) => genre !== null)]);
  }
};

export default fetchLastfmGenres;

import React, { useEffect, useState } from 'react';
import useSpotifyData from '../../getNodes';
import { fetchArtists } from './controller';

const SpotifyCarousel = () => {
  const { data: tracks, isLoading, error: tracksError } = useSpotifyData();
  const [artistsData, setArtistsData] = useState([]);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filter, setFilter] = useState({
    name: '',
    popularity: 80,
    genre: '',
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      fetchArtists(tracks, sortOrder, filter, setArtistsData, setError, isMounted);
    };

    fetchData();
    console.log(fetchData);
    return () => {
      isMounted = false;
    };
  }, [tracks, sortOrder, filter]);

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterChange = (key, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [key]: value,
    }));
  };

  const handlePopularityChange = (value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      popularity: value,
    }));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (tracksError) {
    return <p>Error loading tracks: {tracksError}</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className='filters'>
        <label>
          Sort Order:
          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
        <label>
          Filter by Name:
          <input type="text" value={filter.name} onChange={(e) => handleFilterChange('name', e.target.value)} />
        </label>
        <label>
          Filter by Genre:
          <input type="text" value={filter.genre} onChange={(e) => handleFilterChange('genre', e.target.value)} />
        </label>
        <label>
          Filter by Popularity:
          <select className='filter__popularity' value={filter.popularity} onChange={(e) => handlePopularityChange(e.target.value)}>
            {[50, 60, 70, 80, 85, 90, 95].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className='main__spotify__card'>
        {artistsData.map((artist, index) => (
          <div key={index} className='details__spotify__card'>
            <div className='details__spotify__image'>
              <img src={artist.images[0].url} alt={`Artist name ${artist.name}`} />
            </div>
            <h2>{artist.name}</h2>
            <div className='details__spotify'>

              <div className='spotify__card__details artist_link'>
                <div className='info'>
                  <a href={artist.external_urls.spotify} target='__blank'>Spotify Artist</a>
                </div>
              </div>

              <div className='spotify__card__details'>
                <div className='title'>
                  <p>Genre: </p>
                </div>
                <div className='info'>
                  {artist.genres[0]}
                </div>
              </div>

              <div className='spotify__card__details'>
                <div className='title'>
                  <p>Followers: </p>
                </div>
                <div className='info'>
                  {artist.followers.total}
                </div>
              </div>
              <div className='spotify__card__details'>
                <div className='info'>
                  <p>Popularity: </p>
                </div>
                <div className='info'>
                  {artist.popularity}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SpotifyCarousel;

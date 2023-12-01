// index.jsx
import React from 'react';
import useSpotifyData from '../../getNodes';

const SpotifySongs = () => {
  const { data, isLoading, error } = useSpotifyData();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const formatDate = (dateString) => {
    const addedAtDate = new Date(dateString);
    const month = addedAtDate.getMonth() + 1;
    const day = addedAtDate.getDate();
    const year = addedAtDate.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <>
      <div className='song__card'>
        {data.map((track, index) => (
          <div key={index} className='song__teaser'>

            <div className='relative__div'>
              <img className='song__image' alt={`album__image ${index + 1}`} src={track.track_album_image_url} />
 
              <img className='artist__image' alt={`artist__image ${index + 1}`} src={track.artist_image} />
            </div>

            <h2>{track.track_name}</h2>

            <div className='spotify__card__details spotify__card__song song__link'>
              <div className='info'>
                <a href={track.track_album_url} target="__blank">Spotify Album</a>
              </div>
            </div>

            <div className='spotify__card__details spotify__card__song'>
              <div className='title'>
                <p>Added at: </p>
              </div>
              <div className='info'>
                {formatDate(track.track_added_at)}
              </div>
            </div>

            <div className='spotify__card__details spotify__card__song'>
              <div className='title'>
                <p>Artist Followers: </p>
              </div>
              <div className='info'>
              {track.artist_followers}
              </div>
            </div>

            <div className='spotify__card__details spotify__card__song'>
              <div className='title'>
                <p>Artist Popularity: </p>
              </div>
              <div className='info'>
              {track.artist_popularity}
              </div>
            </div>

            <div className='spotify__card__details spotify__card__song'>
              <div className='title'>
                <p>Artist album type: </p>
              </div>
              <div className='info'>
              {track.track_album_type}
              </div>
            </div>

            <div className='spotify__card__details spotify__card__song'>
              <div className='title'>
                <p>Main Genre: </p>
              </div>
              <div className='info'>
              {track.track_main_genre}
              </div>
            </div>

            <div className='spotify__card__details spotify__card__song'>
              <div className='title'>
                <p>Track Number: </p>
              </div>
              <div className='info'>
              {track.track_number}
              </div>
            </div>

            <div className='spotify__card__details spotify__card__song'>
              <div className='title'>
                <p>Track Popularity: </p>
              </div>
              <div className='info'>
              {track.track_popularity}
              </div>
            </div>

            <div className='spotify__card__details spotify__card__song song__more'>
              <a href={`/node/${track.node_id}`}>
                  View more
              </a>
            </div>

          </div>
        ))}
      </div>
    </>
  );
};

export default SpotifySongs;

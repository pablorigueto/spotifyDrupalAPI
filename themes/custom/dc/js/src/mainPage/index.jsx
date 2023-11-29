import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getAccessToken, getTopHitsPlaylistId, getTopTracks } from './controller';
import fetchLastfmGenres from '../getGenre';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Modal from 'react-modal';

// Define modal styles
const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    width: '50%',
    margin: 'auto',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
  },
};

const SpotifyDataComponent = () => {
  const { data, isLoading, isError } = useQuery('spotifyData', async () => {
    const accessToken = await getAccessToken();
    const topHitsPlaylistId = await getTopHitsPlaylistId(accessToken);
    const tracksData = await getTopTracks(accessToken, topHitsPlaylistId);

    return tracksData;
  });

  const [selectedTrack, setSelectedTrack] = useState(null);

  const openModal = (track) => {
    setSelectedTrack(track);
  };

  const closeModal = () => {
    setSelectedTrack(null);
  };

  const [lastfmGenres, setLastfmGenres] = useState([]);

  useEffect(() => {
    fetchLastfmGenres(data, setLastfmGenres);
  }, [data]);

  if (isLoading && !data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Hello there - world!</h1>
      {isError && <p style={{ color: 'red' }}>Error fetching data. Please try again later.</p>}
      {data && (
        <div>
          <h2>Top 20 Tracks</h2>
          {/* Wrap your tracks in the Carousel component */}
          <Carousel>
            {data.items.map((track, index) => (
              <div key={index}>
                <p>{track.track.name}</p>

                <img src={track.track.album.images[0].url} alt={track.track.name} />

                <div>Genre: {lastfmGenres[index] || 'N/A'}</div>
                <button onClick={() => openModal(track)}>View Details</button>
                {/* Include other track information as needed */}
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {/* Modal for displaying details */}
      <Modal
        isOpen={selectedTrack !== null}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Track Details"
      >
        {selectedTrack && (
          <div>
            <h2>{selectedTrack.track.name}</h2>
            {/* Add other details here */}
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SpotifyDataComponent;

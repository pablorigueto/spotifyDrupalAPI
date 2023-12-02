import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getAccessToken, getTopHitsPlaylistId, getTopTracksWithGenres, sendSpotifyDataToDrupal } from './controller';
import Lottie from "lottie-react";
import lottieLoading from "../../../assets/songloading.json";

const fetchSpotifyData = async () => {
  const accessToken = await getAccessToken();
  const topHitsPlaylistId = await getTopHitsPlaylistId(accessToken);
  const tracksData = await getTopTracksWithGenres(accessToken, topHitsPlaylistId);

  return tracksData;
};

const SpotifyDataComponent = () => {
  const { data, isLoading } = useQuery('spotifyData', fetchSpotifyData, {
    retry: 5,
  });

  const currentPath = window.location.pathname;

  useEffect(() => {
    handleSendDataToDrupal();
  }, [data]);

  const handleSendDataToDrupal = () => {

    if (data) {
      
      const formattedData = data.map((track) => ({
        
        track_name: track.track.name,
        track_added_at: track.added_at,
        track_album_image_url: track.track.album.images[0].url,
        track_id: track.track.id,
        album_type: track.track.album.album_type,
        album_url: track.track.album.external_urls.spotify,
        artist_id: track.track.artists[0].id,
        artist_name: track.track.artists[0].name,
        popularity: track.track.popularity,
        track_number: track.track.track_number,
        genre: track.genre,
        followers: track.followers,
        artist_image: track.artist_image,
        artist_popularity: track.artist_popularity
      }));
      // Call the function to send data to Drupal.
      sendSpotifyDataToDrupal(formattedData);
    }
  };

  return (
    <>
      {currentPath === '/' ? (
        <>
          <p>Building the database before redirecting</p>
          <Lottie
            className='lottiefile'
            animationData={lottieLoading}
            loop={true}
          />
        </>
      ) : null}
    </>
  );

};

export default SpotifyDataComponent;

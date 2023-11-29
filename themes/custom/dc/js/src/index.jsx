import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const SpotifyDataComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Request to your backend server to obtain the access token
        const tokenResponse = await axios.get('https://jobsity.lndo.site/api/getSpotifyAccessToken');
        const accessToken = tokenResponse.data.access_token;
  
        console.log('Token acquired successfully:', accessToken);
  
        // Make a request to your Lando Drupal app, which will forward the request to the Spotify API
        const response = await axios.get(`https://api.spotify.com/v1/browse/new-releases?country=US`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div>
      <h1>Hello there - world!</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && (
        <div>
          <h2>Spotify Data</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<SpotifyDataComponent />, document.getElementById('block-dc-page-title'));

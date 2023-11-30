import { useQuery } from 'react-query';

const fetchCarouselItems = async () => {
  const baseUrl = window.location.href;
  const carouselItems = await axios.get(`${baseUrl}/api/getSpotifyNode`);
  const response = await fetch(carouselItems);
  if (!response.ok) {
    throw new Error('Failed to fetch carousel items');
  }

  return response.json();
};

const useCarouselItems = () => {
  return useQuery('carouselItems', fetchCarouselItems);
};

export default useCarouselItems;

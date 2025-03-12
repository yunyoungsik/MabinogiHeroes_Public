import axios from 'axios';

export const fetchPageViewsData = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api//view/all`);
    return response.data.views;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

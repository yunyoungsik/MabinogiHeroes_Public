import axios from 'axios';

export const fetchChzzkData = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/broadcast/chzzk`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

import { NextResponse } from 'next/server';
import axios from 'axios';

// API 호출을 담당하는 함수
const fetchData = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: { 'x-nxopen-api-key': process.env.NEXON_API },
    });
    return response.data;
  } catch (error) {
    console.error('API Server Error', error);
    return { error: error.response?.data || 'API request failed' };
  }
};

export const GET = async (req) => {
  try {
    const [notice, patch, event] = await Promise.all([
      fetchData(`https://open.api.nexon.com/heroes/v1/notice`),
      fetchData(`https://open.api.nexon.com/heroes/v1/notice-patch`),
      fetchData(`https://open.api.nexon.com/heroes/v1/notice-event`),
    ]);

    return NextResponse.json({ notice, patch, event }, { status: 200 });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ message: 'Server Error', error }, { status: 500 });
  }
};

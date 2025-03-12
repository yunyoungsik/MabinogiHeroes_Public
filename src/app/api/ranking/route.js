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
  const urlParams = new URL(req.url).searchParams;
  const type = Number(urlParams.get('type')) || 0;
  const page = Number(urlParams.get('page')) || 1;

  try {
    const ranking = await fetchData(
      `https://open.api.nexon.com/heroes/v2/ranking/real-time?ranking_type=${type}&page_no=${page}`
    );

    if (ranking.error) {
      return NextResponse.json({ message: '랭킹 데이터를 호출하는 중 에러가 발생했습니다.'}, { status: 502 });
    }

    return NextResponse.json({ ranking }, { status: 200 });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ message: 'Server Error', error }, { status: 500 });
  }
};

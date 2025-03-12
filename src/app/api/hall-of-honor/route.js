import { NextResponse } from 'next/server';
import axios from 'axios';
import { connectToDB } from '@/lib/database';
import Statistics from '@/models/Statistics';

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

  try {
    // const hallOfHonor = await fetchData(
    //   `https://open.api.nexon.com/heroes/v2/ranking/hall-of-honor?ranking_type=${type}`
    // );

    // if (hallOfHonor.error) {
    //   return NextResponse.json({ message: '명예의전당 데이터를 호출하는 중 에러가 발생했습니다.'}, { status: 502 });
    // }

    await connectToDB();

    let hallOfHonor = null; // 초기화

    if (type === 0) {
      hallOfHonor = await Statistics.findOne({ type: '0' });
      if (!hallOfHonor) {
        return NextResponse.json({ message: '데이터가 없습니다.' }, { status: 404 });
      }
    } else if (type === 1) {
      hallOfHonor = await Statistics.findOne({ type: '1' });
      if (!hallOfHonor) {
        return NextResponse.json({ message: '데이터가 없습니다.' }, { status: 404 });
      }
    } else {
      return NextResponse.json({ message: '유효하지 않은 타입입니다.' }, { status: 400 });
    }

    return NextResponse.json({ hallOfHonor }, { status: 200 });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ message: 'Server Error', error }, { status: 500 });
  }
};

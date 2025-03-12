import { NextResponse } from 'next/server';
import axios from 'axios';

const fetchLiveList = async (clientId, clientSecret, next = null) => {
  const url = 'https://openapi.chzzk.naver.com/open/v1/lives';

  // 요청 헤더 설정
  const headers = {
    'Client-Id': clientId,
    'Client-Secret': clientSecret,
    'Content-Type': 'application/json',
  };

  // 요청 파라미터 설정
  const params = {
    size: 20,
    next: next,
  };

  try {
    const response = await axios.get(url, {
      headers: headers,
      params: params,
    });

    return response.data;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    return null;
  }
};

// liveCategoryValue로 필터링하는 함수
const filterLivesByCategory = (lives, category) => {
  return lives.filter((live) => live.liveCategoryValue === category);
};

export const GET = async (req) => {
  const clientId = process.env.CHZZK_CLIENT_ID;
  const clientSecret = process.env.CHZZK_CLIENT_SECRET;

  let allFilteredLives = [];
  const desiredCategory = '마비노기 영웅전'; // 원하는 카테고리
  let next = null;

  const fetchAllLives = async () => {
    const liveListResponses = [];
    do {
      const liveListResponse = await fetchLiveList(clientId, clientSecret, next);
      liveListResponses.push(liveListResponse);
      next = liveListResponse?.content?.page?.next;
    } while (next);

    return liveListResponses;
  };

  const liveListResponses = await fetchAllLives();

  for (const response of liveListResponses) {
    if (response && response.code === 200) {
      const filteredLives = filterLivesByCategory(response.content.data, desiredCategory);
      allFilteredLives = [...allFilteredLives, ...filteredLives];
    }
  }

  return NextResponse.json(allFilteredLives, { status: 200 });
};


export const revalidate = 600;
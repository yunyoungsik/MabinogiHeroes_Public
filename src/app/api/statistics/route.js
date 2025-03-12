import { NextResponse } from 'next/server';
import Statistics from '@/models/Statistics';
import { connectToDB } from '@/lib/database';
import cron from 'node-cron';
import axios from 'axios';

const getKoreanDate = () => {
  const now = new Date();
  now.setUTCHours(now.getUTCHours() + 9); // UTC -> KST 변환 (UTC +9)

  const dateString = now.toISOString().split('T');
  const date = dateString[0];
  const time = dateString[1].split(':'); // 시간을 ':'을 기준으로 분리

  return `${date} ${time[0]}:${time[1]}`; // 'yyyy-mm-dd HH:mm' 형식
};

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

const fetchHallOfHonorData = async () => {
  try {
    await connectToDB();

    const urlType0 = 'https://open.api.nexon.com/heroes/v2/ranking/hall-of-honor?ranking_type=0';
    const hallOfHonorType0 = await fetchData(urlType0);

    const date = getKoreanDate(); // 한국 시간으로 날짜 가져오기

    if (hallOfHonorType0.ranking && hallOfHonorType0.ranking.length > 0) {
      // 기존 데이터 삭제
      await Statistics.deleteMany({ type: '0' });

      // 각 캐릭터에 대한 class와 guild 정보를 가져오기 위한 Promise 배열
      const characterInfoPromises = hallOfHonorType0.ranking.map(async (item) => {
        const encodedName = encodeURIComponent(item.character_name); // 캐릭터 이름 인코딩
        const { class: characterClass, guild: characterGuild } = await fetchCharacterInfo(
          encodedName
        );

        return {
          ranking: item.ranking,
          score: item.score,
          character_name: item.character_name,
          class: characterClass,
          guild: characterGuild,
        };
      });

      // 모든 Promise가 완료될 때까지 대기
      const characters = await Promise.all(characterInfoPromises);

      // 새로운 데이터 생성
      const statisticsType0 = {
        type: '0',
        lastUpdated: date,
        character: characters,
      };

      try {
        await Statistics.insertMany([statisticsType0]); // 새로 생성하여 저장
      } catch (err) {
        console.error('Error saving data to MongoDB (type 0):', err);
      }
    } else {
      console.log('No data to save for type 0');
    }

    // type 1 데이터 처리
    const urlType1 = 'https://open.api.nexon.com/heroes/v2/ranking/hall-of-honor?ranking_type=1';
    const hallOfHonorType1 = await fetchData(urlType1);

    if (hallOfHonorType1.ranking && hallOfHonorType1.ranking.length > 0) {
      // 기존 데이터 삭제
      await Statistics.deleteMany({ type: '1' });

      // 각 캐릭터에 대한 class와 guild 정보를 가져오기 위한 Promise 배열
      const characterInfoPromises = hallOfHonorType1.ranking.map(async (item) => {
        const encodedName = encodeURIComponent(item.character_name); // 캐릭터 이름 인코딩
        const { class: characterClass, guild: characterGuild } = await fetchCharacterInfo(
          encodedName
        );

        return {
          ranking: item.ranking,
          score: item.score,
          character_name: item.character_name,
          class: characterClass,
          guild: characterGuild,
        };
      });

      // 모든 Promise가 완료될 때까지 대기
      const characters = await Promise.all(characterInfoPromises);

      // 새로운 데이터 생성
      const statisticsType1 = {
        type: '1',
        lastUpdated: date,
        character: characters,
      };

      try {
        await Statistics.insertMany([statisticsType1]); // 새로 생성하여 저장
      } catch (err) {
        console.error('Error saving data to MongoDB (type 1):', err);
      }
    } else {
      console.log('No data to save for type 1');
    }
  } catch (error) {
    console.error('Error fetching or saving data:', error);
  }
};

// 캐릭터 정보 가져오는 함수
async function fetchCharacterInfo(encodedName) {
  const ocidData = await fetchData(
    `https://open.api.nexon.com/heroes/v2/id?character_name=${encodedName}`
  );
  const ocid = ocidData?.ocid;

  if (!ocid) {
    return { class: null, guild: null }; // 기본값으로 null 반환
  }

  const [basic, guild] = await Promise.all([
    fetchData(`https://open.api.nexon.com/heroes/v2/character/basic?ocid=${ocid}`),
    fetchData(`https://open.api.nexon.com/heroes/v2/character/guild?ocid=${ocid}`),
  ]);

  return {
    class: basic?.character_class_name || null,
    guild: guild?.guild_name || null,
  };
}

export async function GET(request) {
  await fetchHallOfHonorData();
  return NextResponse.json({ message: 'Fetching Hall of Honor data and saving to DB.' });
}

// 매일 오전 9시 30분에 실행
cron.schedule('30 12 * * *', async () => {
  await fetchHallOfHonorData();
});

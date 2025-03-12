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
  const name = new URL(req.url).searchParams.get('name');
  const encodeName = encodeURIComponent(name);

  if (!name) {
    return NextResponse.json({ message: '이름을 입력하세요.' }, { status: 400 });
  }

  try {
    const ocidData = await fetchData(
      `https://open.api.nexon.com/heroes/v2/id?character_name=${encodeName}`
    );
    const ocid = ocidData?.ocid;

    if (!ocid) {
      return NextResponse.json({ message: '계정을 찾을 수 없습니다.' }, { status: 404 });
    }

    const [basic, title, titleEquipment, itemEquipment, stat, guild] = await Promise.all([
      fetchData(`https://open.api.nexon.com/heroes/v2/character/basic?ocid=${ocid}`),
      fetchData(`https://open.api.nexon.com/heroes/v2/character/title?ocid=${ocid}`),
      fetchData(`https://open.api.nexon.com/heroes/v2/character/title-equipment?ocid=${ocid}`),
      fetchData(`https://open.api.nexon.com/heroes/v2/character/item-equipment?ocid=${ocid}`),
      fetchData(`https://open.api.nexon.com/heroes/v2/character/stat?ocid=${ocid}`),
      fetchData(`https://open.api.nexon.com/heroes/v2/character/guild?ocid=${ocid}`),
    ]);

    return NextResponse.json(
      { basic, title, titleEquipment, itemEquipment, stat, guild },
      { status: 200 }
    );
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ message: 'Server Error', error }, { status: 500 });
  }
};

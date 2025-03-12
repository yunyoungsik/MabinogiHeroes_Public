import { connectToDB } from '@/lib/database';
import View from '@/models/View';
import { getKoreanDate } from '@/utils/getKoreanDate';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
  const username = new URL(req.url).searchParams.get('name');
  const name = decodeURIComponent(username);

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  try {
    await connectToDB();

    // 기존 문서를 조회
    let pageView = await View.findOne({ name });

    const today = getKoreanDate(); // 한국 날짜 (yyyy-mm-dd)

    if (!pageView) {
      // 문서가 없다면 새로 생성
      pageView = new View({ name, totalViews: 1, todayViews: 1, lastUpdated: today });
      await pageView.save();
      return NextResponse.json(
        {
          name,
          totalViews: 1,
          todayViews: 1,
        },
        { status: 200 }
      );
    }

    // 날짜 비교: 저장된 lastUpdated와 오늘의 날짜 비교
    if (pageView.lastUpdated === today) {
      // 같은 날이면 todayViews + 1
      pageView.todayViews += 1;
    } else {
      // 새로운 날이면 todayViews 초기화
      pageView.todayViews = 1;
      pageView.lastUpdated = today; // 날짜 갱신
    }

    // totalViews는 무조건 +1
    pageView.totalViews += 1;

    // 변경 사항 저장
    await pageView.save();

    return NextResponse.json(
      {
        name,
        totalViews: pageView.totalViews,
        todayViews: pageView.todayViews,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ MongoDB 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data', details: error.message },
      { status: 500 }
    );
  }
};

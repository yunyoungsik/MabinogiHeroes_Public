import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import View from '@/models/View';

export const GET = async (req) => {
  try {
    await connectToDB();

    // 전체 데이터 조회
    const views = await View.find(); // 모든 문서 조회

    return NextResponse.json(
      {
        views, // 조회한 데이터 반환
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ MongoDB 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '데이터 조회에 실패했습니다.', details: error.message },
      { status: 500 }
    );
  }
};

export const revalidate = 0;

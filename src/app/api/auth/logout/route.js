import { NextResponse } from 'next/server';

export async function POST(req, res) {
  try {
    const response = NextResponse.json(
      { success: true, message: '로그아웃 성공' },
      { status: 200 }
    );

    // 'token' 쿠키 삭제
    response.cookies.delete('token');

    return response;
  } catch (error) {
    console.error('로그아웃 에러:', error);
    return NextResponse.json(
      { success: false, message: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.' },
      { status: 500 }
    );
  }
}

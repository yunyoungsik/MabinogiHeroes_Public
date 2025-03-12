import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import User from '@/models/User';

export async function DELETE(req) {
  try {
    await connectToDB();

    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: '회원탈퇴 시도 중 오류가 발생했습니다.' },
        { status: 400 }
      );
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return NextResponse.json(
        { success: false, message: '회원탈퇴 시도 중 오류가 발생했습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: '회원탈퇴 성공' }, { status: 200 });
  } catch (error) {
    return new Response('Server Error', { status: 500 });
  }
}

// 닉네임 유효성 검사 함수
const isValidName = (name) => {
  const nameRegex = /^[a-zA-Z0-9가-힣_]{2,20}$/; // 2~20자, 영문/숫자/한글/밑줄 허용
  return nameRegex.test(name);
};

export async function PATCH(req) {
  try {
    await connectToDB();

    // 요청 데이터 추출
    const { userId, username } = await req.json();
    if (!userId || !username) {
      return NextResponse.json(
        { success: false, message: '유저 ID와 새로운 닉네임을 입력하세요.' },
        { status: 400 }
      );
    }

    // 닉네임 유효성 검사
    if (!isValidName(username)) {
      return NextResponse.json(
        { success: false, message: '닉네임은 2~10자의 영문, 숫자, 한글, 밑줄만 허용됩니다.' },
        { status: 400 }
      );
    }

    // 닉네임 중복 확인
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: '이미 사용 중인 닉네임입니다.' },
        { status: 409 }
      );
    }

    // 닉네임 업데이트
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username },
      { new: true } // 업데이트 후 변경된 문서 반환
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: '닉네임이 성공적으로 변경되었습니다.', user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error('닉네임 변경 오류:', error);
    return NextResponse.json(
      { success: false, message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' },
      { status: 500 }
    );
  }
}

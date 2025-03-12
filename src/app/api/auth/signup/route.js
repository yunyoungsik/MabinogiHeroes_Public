import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDB } from '@/lib/database';
import User from '@/models/User';

const isValidName = (name) => {
  const nameRegex = /^[a-zA-Z0-9가-힣_]{2,20}$/; // 2~10자, 영문/숫자/한글/밑줄 허용
  return nameRegex.test(name);
};

export async function POST(req, res) {
  try {
    await connectToDB();
    const { email, password, username } = await req.json();
    if (!email || !password || !username) {
      return NextResponse.json(
        { success: false, message: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 중복 이메일 확인
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { success: false, message: '이미 사용 중인 이메일입니다.' },
        { status: 409 }
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

    // 사용자 생성
    const newUser = await User.create({ email, password, username });

    // JWT 생성 및 쿠키 설정
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: newUser._id,
          email: newUser.email,
          username: newUser.username,
          role: newUser.role,
        },
      },
      { status: 200 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json(
      { success: false, message: '서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.' },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { protectRoute } from "@/middleware/auth";

export async function GET(req) {
  try {
    // 인증 확인
    const { user, error } = await protectRoute(req);
    if (error) {
      return NextResponse.json({ success: false, message: error }, { status: 401 });
    }

    // 사용자 정보 반환 (비밀번호 제외)
    return NextResponse.json({ success: true, user: { id: user._id, email: user.email, username: user.username, role: user.role } }, { status: 200 });
  } catch (error) {
    console.error("GET /me error:", error);
    return NextResponse.json({ success: false, message: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

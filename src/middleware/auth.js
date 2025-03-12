import jwt from "jsonwebtoken";
import User from "@/models/User";
import { cookies } from "next/headers";

// 인증 미들웨어 함수
export const protectRoute = async (req) => {
  try {
    // 토큰 가져오기 (쿠키에서 추출)
    const token = cookies().get("token")?.value;

    if (!token) return { error: "Not authorized - No token provided" };

    // JWT 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return { error: "Not authorized - Invalid token" };

    // 사용자 조회
    const user = await User.findById(decoded.id);
    if (!user) return { error: "User not found" };

    return { user }; // 인증된 사용자 반환
  } catch (error) {
    console.error("Auth middleware error:", error);
    return { error: "Internal server error" };
  }
};
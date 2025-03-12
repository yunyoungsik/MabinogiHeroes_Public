export const getKoreanDate = () => {
  const now = new Date();
  now.setUTCHours(now.getUTCHours() + 9); // KST 변환 (UTC + 9)
  return now.toISOString().split('T')[0]; // yyyy-mm-dd 형식 반환
};
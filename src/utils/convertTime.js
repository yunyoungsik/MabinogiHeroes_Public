export default function convertTime(utcString) {
  // 입력값이 없거나 유효하지 않은 경우 처리
  if (!utcString || isNaN(new Date(utcString).getTime())) {
    // console.error('유효하지 않은 날짜:', utcString);
    return;
  }
  
  // UTC 문자열을 Date 객체로 변환 (자동으로 UTC로 인식)
  const utcDate = new Date(utcString);

  // 한국 시간(UTC+9)으로 변환
  const koreaDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);

  // "YYYY-MM-DD HH:MM:SS" 형식으로 변환
  const formattedKoreaDateString = koreaDate.toISOString().replace('T', ' ').slice(0, -5);

  return formattedKoreaDateString;
};
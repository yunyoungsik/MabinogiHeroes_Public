export const formatDate = (dateString) => {
  // Date 객체로 변환
  const date = new Date(dateString);

  // 날짜 형식 지정
  const options = { month: 'long', day: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(date);

  return formattedDate; // "2월 23일" 형식으로 반환
};

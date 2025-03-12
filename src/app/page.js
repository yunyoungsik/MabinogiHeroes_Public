import HomePage from '../components/Home/Home';

export const metadata = {
  title: 'MHON.KR - 마비노기영웅전 캐릭터 검색 및 랭킹, 거래소 정보',
  description:
    '마비노기 영웅전 캐릭터 검색, 실시간 랭킹, 거래소 시세를 한눈에 확인하세요. 최신 정보로 빠르게 원하는 데이터를 찾아보세요.',
};

export default async function Home() {
  return <HomePage />;
}
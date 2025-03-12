import Agreement from '@/components/Policies/Agreement';

export const metadata = () => ({
  title: `MHON.KR 이용약관 - 마비노기영웅전 캐릭터 검색 및 랭킹, 거래소 정보 MHON.KR`,
  description: `MHON.KR의 이용약관 페이지입니다. 마비노기 영웅전 캐릭터 검색 서비스 이용 시 반드시 확인해야 할 주요 정책과 규정을 안내합니다.`,
});

export default function page() {
  return <Agreement />;
}

import Privacy from '@/components/Policies/Privacy';

export const metadata = () => ({
  title: `MHON.KR 개인정보 처리방침 - 마비노기영웅전 캐릭터 검색 및 랭킹, 거래소 정보 MHON.KR`,
  description:
    'MHON.KR은 마비노기영웅전 캐릭터 검색 서비스 제공을 위해 최소한의 개인정보를 수집하며, 안전하게 보호하고 있습니다. 개인정보 수집 항목과 이용 목적을 확인하세요.',
});

export default function page() {
  return <Privacy />;
}

import Marketplace from '@/components/Marketplace/Marketplace';

export const metadata = {
  title: '마영전 거래소 정보 - 아이템 시세 및 거래 내역 - MHON.KR',
  description:
    '마비노기 영웅전 거래소 최신 아이템 시세와 거래 내역을 확인하고, 원하는 아이템의 가격 변동을 빠르게 파악하세요.',
};

export default function page() {
  return <Marketplace />;
}

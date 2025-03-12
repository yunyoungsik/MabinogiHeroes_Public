import Raid from '@/components/Raid/Raid';

export const metadata = {
  title: '마영전 레이드 상한 계산기 - 빠르고 손쉬운 마영전 상한 계산 - MHON.KR',
  description:
    '마비노기 영웅전의 레이드 상한을 쉽게 계산할 수 있는 도구입니다. 캐릭터 이름만 입력하면 레이드 상한을 빠르게 확인하세요.',
};

export default function page() {
  return <Raid />;
}

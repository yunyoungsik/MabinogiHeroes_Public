import Rank from "@/components/Ranking/Rank";

export const metadata = {
  title: '마영전 실시간 랭킹 및 명예의 전당 - 공격력, 마법공격력 순위 - MHON.KR',
  description: '마비노기 영웅전의 실시간 랭킹과 명예의 전당을 한눈에 확인하세요. 공격력과 마법공격력 순위를 빠르고 정확하게 제공합니다.',
};

export default function page() {
  return (
  <Rank />
  )
}
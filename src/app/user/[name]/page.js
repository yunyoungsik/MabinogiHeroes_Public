import Character from '@/components/Characters/Character';

export async function generateMetadata({ params }) {
  const name = params.name;
  return {
    title: `${decodeURIComponent(name)} - 캐릭터 정보 검색 - MHON.KR`,
    description: `마비노기영웅전 캐릭터 정보를 확인하세요. 능력치, 장비, 스킬 등 다양한 정보를 한눈에 확인할 수 있습니다.`,
  };
}

export default function page({ params }) {
  const { name } = params;
  return <Character name={name} />;
}

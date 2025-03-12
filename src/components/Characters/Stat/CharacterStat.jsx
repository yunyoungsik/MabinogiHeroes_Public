import { useUserStore } from '@/store/useUserStore';
import styles from './CharacterStat.module.scss';

const statLayout = [
  {
    id: '1',
    stats: ['공격력', '마법공격력', '방어력'],
  },
  {
    id: '2',
    stats: ['힘', '민첩', '지능', '의지', '행운'],
  },
  {
    id: '3',
    stats: ['최대 생명력', '최대 스태미나'],
  },
  {
    id: '4',
    stats: ['크리티컬', '크리티컬 피해량', '크리티컬 저항'],
  },
  {
    id: '5',
    stats: ['공격속도', '추가피해', '밸런스', '공격력 제한 해제', '대항력'],
  },
];

const CharacterStat = () => {
  const { loading, stat: data } = useUserStore();

  const mappedStats = statLayout.map((section) => ({
    ...section,
    items: data.filter((stat) => section.stats.includes(stat.stat_name)),
  }));

  if (loading) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby="stat-section-title">
      <div className={styles.title}>
        <h2 id="stat-section-title">능력치</h2>
      </div>

      <ul className={styles.stat}>
        {mappedStats.map((section, index) => (
          <li key={section.id} className={`${index === 0 ? styles.first : ''}`}>
            {section.items.map((stat) => (
              <div key={stat.stat_name} className={styles.statItem} role="listitem">
                <p>{stat.stat_name || '-'}</p>
                <p>{stat.stat_value || 0}</p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CharacterStat;

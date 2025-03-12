'use client';

import { useEffect, useState } from 'react';
import { useRankingStore } from '@/store/useRankingStore';
import styles from './Statistics.module.scss';
import RankDropdon from './Dropdown/RankDropdon';
import { Settings2 } from 'lucide-react';
import StatisticsLayout from './StatisticsLayout/StatisticsLayout';
import Loading from '../ui/Loading';

const StatisticsSection = () => {
  const [type, setType] = useState(0);
  const { hallLoading, hallOfHonors, fetchHallOfHonors } = useRankingStore();

  useEffect(() => {
    if (
      (type === 0 && hallOfHonors.ad.length === 0) ||
      (type === 1 && hallOfHonors.ap.length === 0)
    ) {
      fetchHallOfHonors({ type });
    }
  }, [type]);

  if (hallLoading) {
    return (
      <section className={styles.section}>
        <div className={styles.title}>
          <h2>명예의전당 통계</h2>
          <p>
            명예의 전당 - 매일 오전 9시 기준 업데이트 (공격력 최대 200위, 마법공격력 최대 100위)
          </p>
        </div>
        <div style={{ width: '100%', height: '300px' }}>
          <Loading />
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <h2>명예의전당 통계</h2>
        <p>명예의 전당 - 매일 오전 9시 기준 업데이트 (공격력 최대 200위, 마법공격력 최대 100위)</p>
      </div>

      <div className={styles.filter}>
        <div className={styles.filterTitle}>
          <Settings2 width={14} hanging={14} stroke="#6b7684" />
          <span>필터</span>
        </div>

        <div className={styles.filterList}>
          {/* 공격력/마법공격력 드롭다운 */}
          <RankDropdon rankType={type} setType={setType} options={['공격력', '마법공격력']} />
        </div>
      </div>

      <StatisticsLayout type={type} data={type === 0 ? hallOfHonors.ad : hallOfHonors.ap} />
    </section>
  );
};

export default StatisticsSection;

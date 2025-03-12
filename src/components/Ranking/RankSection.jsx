'use client';

import React, { useState } from 'react';
import { Settings2 } from 'lucide-react';
import RankDropdown from './Dropdown/RankDropdonw';
import styles from './Rank.module.scss';
import HallOfHonor from './HallOfHonor/HallOfHonor';
import RankPagenation from './Pagenation/RankPagenation';
import LiveRank from './Live/LiveRank';

const RankSection = () => {
  const [rankType, setRankType] = useState(0); // 0: 명예의 전당, 1: 실시간 랭킹
  const [type, setType] = useState(0); // 0: 공격력, 1: 마법공격력
  const [localPage, setLocalPage] = useState(1);

  const maxPage = rankType === 0 ? (type === 0 ? 20 : 10) : type === 0 ? 400 : 200;
  // const maxPage = rankType === 0 ? (type === 0 ? 20 : 10) : type === 0 ? 50 : 50;

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <h2>랭킹</h2>
        <p>명예의 전당 - 매일 오전 9시 기준 업데이트 (공격력 최대 200위, 마법공격력 최대 100위)</p>
        <p>실시간 랭킹 - 1시간마다 업데이트 (공격력 최대 4,000위, 마법공격력 최대 2,000위)</p>
      </div>

      <div className={styles.filter}>
        <div className={styles.filterTitle}>
          <Settings2 width={14} hanging={14} stroke="#6b7684" />
          <span>필터</span>
        </div>

        <div className={styles.filterList}>
          {/* 랭킹 종류 드롭다운 */}
          <RankDropdown
            rankType={rankType}
            setRankType={setRankType}
            setLocalPage={setLocalPage}
            options={['명예의전당', '실시간랭킹']}
          />

          {/* 공격력/마법공격력 드롭다운 */}
          <RankDropdown
            rankType={type}
            setRankType={setType}
            setLocalPage={setLocalPage}
            options={['공격력', '마법공격력']}
          />
        </div>
      </div>

      {rankType === 0 && (
        <HallOfHonor
          rankType={rankType}
          type={type}
          localPage={localPage}
          setLocalPage={setLocalPage}
        />
      )}
      {rankType === 1 && (
        <LiveRank
          rankType={rankType}
          type={type}
          localPage={localPage}
          setLocalPage={setLocalPage}
        />
      )}

      <RankPagenation localPage={localPage} setLocalPage={setLocalPage} maxPage={maxPage} />
    </section>
  );
};

export default RankSection;

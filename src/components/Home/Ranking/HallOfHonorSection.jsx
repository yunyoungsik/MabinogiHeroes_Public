'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRankingStore } from '@/store/useRankingStore';
import RankingLayout from './RankingLayout';

const HallOfHonorSection = ({ view, localPage }) => {
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

  const pageSize = view;
  const rankingList = type === 0 ? hallOfHonors.ad : hallOfHonors.ap;
  const startIndex = (localPage - 1) * pageSize;
  const endIndex = localPage * pageSize;
  const currentData = useMemo(
    () => rankingList.slice(startIndex, endIndex),
    [rankingList, startIndex, endIndex]
  );

  return (
    <RankingLayout
      loading={hallLoading}
      label={'명예의전당'}
      standard={'오전 9:00 기준'}
      type={type}
      setType={setType}
      data={currentData}
    />
  );
};

export default HallOfHonorSection;

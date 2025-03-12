import React, { useEffect, useMemo } from 'react';
// store
import { useRankingStore } from '@/store/useRankingStore';
// components
import RankLayout from '../RankLayout/RankLayout';
const HallOfHonor = ({ type, localPage }) => {
  const { loading, hallOfHonors, fetchHallOfHonors } = useRankingStore();

  useEffect(() => {
    if (
      (type === 0 && hallOfHonors.ad.length === 0) ||
      (type === 1 && hallOfHonors.ap.length === 0)
    ) {
      fetchHallOfHonors({ type });
    }
  }, [type]);

  const pageSize = 10;
  const rankingList = type === 0 ? hallOfHonors.ad : hallOfHonors.ap;
  const startIndex = (localPage - 1) * pageSize;
  const endIndex = localPage * pageSize;
  const currentData = useMemo(
    () => rankingList.slice(startIndex, endIndex),
    [rankingList, startIndex, endIndex]
  );

  return <RankLayout rankType={0} loading={loading} data={currentData} />;
};

export default HallOfHonor;

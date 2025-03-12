'use client';

import LiveRankingSection from './LiveRankingSection';
import HallOfHonorSection from './HallOfHonorSection';
import SearchRanking from './SearchRanking';

const Ranking = () => {
  return (
    <>
      <LiveRankingSection view={5} localPage={1} />
      <HallOfHonorSection view={5} localPage={1} />
      <SearchRanking  />
    </>
  );
};

export default Ranking;

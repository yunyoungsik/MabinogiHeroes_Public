'use client';

import { useState, useEffect, useMemo } from 'react';
import RankingLayout from './RankingLayout';
import { useRankingStore } from '@/store/useRankingStore';
import {getStandardTime} from '@/utils/getStandardTime'

const LiveRankingSection = ({ view, localPage }) => {
  const [type, setType] = useState(0);
  const [standardTime, setStandardTime] = useState('');
  const { liveLoading, rankings, fetchRanking } = useRankingStore();

  const pageSize = view; // 한 페이지당 아이템 수
  const chunkSize = 500; // API에서 가져오는 단위
  const maxItems = type === 0 ? 4000 : 2000; // 최대 항목 수

  // localPage에서 필요한 chunkIndex 계산
  const chunkIndex = Math.ceil(localPage / (chunkSize / pageSize));

  // 필요한 chunk만 호출 (중복 방지)
  useEffect(() => {
    if (!rankings[type]?.[chunkIndex] && chunkIndex * chunkSize < maxItems) {
      fetchRanking({ type, page: chunkIndex });
    }
  }, [type, fetchRanking]);

  // 해당 type의 데이터 가져오기
  const rankingList = type === 0 ? rankings.ad : rankings.ap;

  // localPage에 맞는 데이터 잘라내기 (메모이제이션)
  const currentData = useMemo(() => {
    const startIndex = (localPage - 1) * pageSize;
    return rankingList.slice(startIndex, startIndex + pageSize);
  }, [rankingList, localPage, pageSize]);

  // 클라이언트에서만 시간 설정 (Hydration Error 방지)
  useEffect(() => {
    setStandardTime(getStandardTime());
  }, []);

  return (
    <RankingLayout
      loading={liveLoading}
      label={'실시간랭킹'}
      standard={`오늘 ${standardTime} 기준`}
      type={type}
      setType={setType}
      data={currentData}
    />
  );
};

export default LiveRankingSection;

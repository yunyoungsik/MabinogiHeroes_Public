'use client';

import KakaoAd2 from './KakaoAd2';
import KakaoAd3 from './KakaoAd3';
import { useScrollHandler } from '@/hooks/useScrollAd';

const KakaoAdSet = () => {
  useScrollHandler('.ad__banner2', 100);
  return (
    <>
      <KakaoAd2 position="right" />
      <KakaoAd3 position="left" />
    </>
  );
};

export default KakaoAdSet;

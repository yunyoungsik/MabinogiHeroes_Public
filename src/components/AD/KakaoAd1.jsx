'use client';

import React, { useEffect, useRef } from 'react';

const KakaoAd1 = ({ customClass }) => {
  const adRef = useRef(null);

  useEffect(() => {
    // ✅ Kakao 광고 스크립트 동적 로드
    if (window && adRef.current) {
      const script = document.createElement('script');
      script.src = 'https://t1.daumcdn.net/kas/static/ba.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
  return (
    <aside className="ad__banner" aria-label="광고 배너">
      <div className="ad__kakao">
        <div className="ad__kakao_728_90">
          <ins
            ref={adRef}
            className="kakao_ad_area"
            style={{ display: 'none' }}
            data-ad-unit="DAN-PKQ0cqLc99gaHxsu"
            data-ad-width="728"
            data-ad-height="90"
          ></ins>
        </div>

        <div className="ad__kakao_320_100">
          <ins
            ref={adRef}
            className="kakao_ad_area"
            style={{ display: 'none' }}
            data-ad-unit="DAN-KfISXhfioyEtXYf0"
            data-ad-width="320"
            data-ad-height="100"
          ></ins>
        </div>
      </div>
    </aside>
  );
};

export default KakaoAd1;

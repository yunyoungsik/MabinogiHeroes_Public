'use client';

import { useEffect, useRef } from 'react';

const KakaoAd3 = ({ position }) => {
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
    <>
      <aside className={`ad__banner2 ${position}`} aria-label="광고 배너">
        <ins
          ref={adRef}
          className="kakao_ad_area"
          style={{ display: 'none' }}
          data-ad-unit="DAN-OhkiTkIbPbn9gwS7"
          data-ad-width="160"
          data-ad-height="600"
        ></ins>
      </aside>
    </>
  );
};

export default KakaoAd3;

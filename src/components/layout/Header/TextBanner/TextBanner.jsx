'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import styles from './TextBanner.module.scss';

const TextBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.textBanner}>
      <div className={styles.container}>
        <a href="https://discord.gg/TpTS6SEZu2" target="_blank" rel="noopener noreferrer">📢 마영전 게임 및 방송과 관련된 이벤트·홍보용 슬라이드 배너를 등록해드립니다</a>
        <button type="button" onClick={handleClose} ria-label="배너 닫기">
          <X size={16} stroke='#e5e8eb' />
        </button>
      </div>
    </div>
  );
};

export default TextBanner;

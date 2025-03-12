import { useEffect, useState } from 'react';

const useAdBlockDetector = () => {
  const [isAdBlocked, setIsAdBlocked] = useState(false);

  useEffect(() => {
    const checkAdBlock = () => {
      const adElement = document.querySelector('.ad__kakao');

      if (!adElement || adElement.offsetHeight === 0) {
        setIsAdBlocked(true); // 광고 차단 감지됨
      }
    };

    const timer = setTimeout(checkAdBlock, 3000);

    return () => clearTimeout(timer);
  }, []);

  return isAdBlocked;
};

export default useAdBlockDetector;

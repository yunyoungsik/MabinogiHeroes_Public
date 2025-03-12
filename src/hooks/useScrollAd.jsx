import { useEffect } from 'react';

export const useScrollHandler = (selector, offset) => {
  useEffect(() => {
    const handleScrollEvent = () => {
      const element = document.querySelectorAll(selector);
      if (!element) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      element.forEach((element) => {
        if (scrollTop >= offset) {
          element.classList.add('fixed');
        } else {
          element.classList.remove('fixed');
        }
      });
    };

    window.addEventListener('scroll', handleScrollEvent);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, [selector, offset]);
};

'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './RankDropdown.module.scss';

const RankDropdown = ({ rankType, setType, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (index) => {
    setIsOpen(false);
    setType(index);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{options[rankType]}</span>
        <ChevronDown />
      </button>

      {isOpen && (
        <ul className={styles.menu} role="listbox">
          {options.map((label, index) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => handleSelect(index)}
                className={rankType === index ? styles.active : ''}
                // aria-selected={rankType === index}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RankDropdown;

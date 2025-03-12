'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
// components
import Chart from './Chart/Chart';
import ChartHeader from './Chart/ChartHeader';
import KakaoAd1 from '../AD/KakaoAd1';
// store
import { useMarketplaceStore } from '@/store/useMarketplaceStore';
// json
import itemData from '@/data/item.json';
import styles from './Marketplace.module.scss';
import Loading from '../ui/Loading';

const MarketplaceSection = () => {
  const searchRef = useRef(null);
  const { loading, error, item, fetchMarketplace } = useMarketplaceStore();
  const [itemName, setItemName] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // 아이템 검색 핸들러
  const handleSearch = useCallback(() => {
    const trimmedItemName = itemName.trim();
    if (!trimmedItemName) return;
    fetchMarketplace({ itemName: trimmedItemName });
  }, [itemName, fetchMarketplace]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 실시간 검색어 필터링
  useEffect(() => {
    if (!itemName.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = itemData.reduce((acc, category) => {
      const matchedItems = category.items.filter((i) => i.name.includes(itemName));

      if (matchedItems.length) {
        acc.push({ cate: category.cate, items: matchedItems });
      }
      return acc;
    }, []);

    setSuggestions(filtered);
  }, [itemName]);

  // 드롭다운에서 선택 시
  const handleSelectItem = (name) => {
    setItemName(name);
    fetchMarketplace({ itemName: name }); // 아이템 검색();
    setItemName('');
    setSuggestions([]);
  };

  // 영역 밖 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if(loading) {
    return (
      <Loading />
    )
  }

  return (
    <section className={styles.marketplace}>
      <div className={styles.container}>
        {/* 광고 배너 */}
        <KakaoAd1 />

        {/* 거래소 */}
        <div className={styles.marketplaceSection} aria-labelledby="marketplace-title">
          <div className={styles.marketplaceHeader}>
            <ChartHeader item={item} />

            {/* 검색 입력 */}
            <div className={styles.search}>
              <label htmlFor="item-search">아이템 검색</label>
              <input
                id="item-search"
                type="text"
                autoComplete='off'
                placeholder="아이템명을 입력하세요."
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleSearch} disabled={loading} aria-label="검색">
                <Search size={14} stroke="#8b95a1" />
              </button>

              {/* 드롭다운 */}
              {suggestions.length > 0 && (
                <ul className={styles.dropdown} ref={searchRef}>
                  {suggestions.map((group) => (
                    <li key={group.cate}>
                      <strong>{group.cate}</strong>
                      <ul>
                        {group.items.map((item) => (
                          <li key={item.name} onClick={() => handleSelectItem(item.name)}>
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* 차트 컴포넌트 */}
          <Chart error={error} item={item} />
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;

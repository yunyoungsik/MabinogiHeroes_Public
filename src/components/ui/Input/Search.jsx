'use client';

import styles from './Search.module.scss';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

const Search = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (name.trim()) {
      router.push(`/user/${encodeURIComponent(name)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={styles.search}>
      <label htmlFor="search">
        캐릭터명 검색
      </label>
      <input
        id="search"
        className={styles.input}
        type="text"
        placeholder="캐릭터명을 입력하세요."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="submit"
        aria-label="검색"
      >
        <SearchIcon size={16} stroke="#8b95a1" />
      </button>
    </form>
  );
};

export default Search;

'use client';

import { useEffect, useMemo, useState } from 'react';
import { SearchIcon } from 'lucide-react';
// utils
import timeAgo from '@/utils/timeAgo';
import convertTime from '@/utils/convertTime';
// components
import Loading from '@/components/ui/Loading';
// store
import { useNoticeStore } from '@/store/useNoticeStore';
// styles
import styles from '../List/PostList.module.scss';

const PostCateList = ({ data, cate }) => {
  return (
    <div className={styles.list}>
      <ul>
        {data?.map((post) => (
          <li key={post.url}>
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              <h2>{post.title}</h2>

              <div className={styles.info}>
                {cate === 'event' ? (
                  <p>
                    {post.date_event_start && (
                      <span>{convertTime(post.date_event_start).split(' ')[0]}</span>
                    )}
                    {post.date_event_start && post.date_event_end && <span>~</span>}
                    {post.date_event_end && (
                      <span>{convertTime(post.date_event_end).split(' ')[0]}</span>
                    )}
                  </p>
                ) : (
                  <p>{timeAgo(convertTime(post.date))}</p>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CateList = ({ cate }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState([]);
  const { loading, notice, patch, event, fetchNotice } = useNoticeStore();

  useEffect(() => {
    if (!notice.length || !patch.length || !event.length) {
      fetchNotice();
    }
  }, [fetchNotice, notice, patch, event]);

  // cate에 따른 데이터 선택
  const data = useMemo(() => {
    switch (cate) {
      case 'notice':
        return notice;
      case 'patch':
        return patch;
      case 'event':
        return event;
      default:
        return [];
    }
  }, [cate, notice, patch, event]);

  // 검색 기능 구현
  useEffect(() => {
    if (searchText) {
      const searchResult = data.filter((item) => new RegExp(searchText, 'i').test(item.title));
      setSearchedResults(searchResult);
    } else {
      setSearchedResults(data);
    }
  }, [searchText, data]);

  if (loading)
    return (
      <section className={styles.section}>
        <Loading />
      </section>
    );

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="notice__search">공지사항 검색</label>
          <input
            type="text"
            placeholder="검색"
            name="notice__search"
            id="notice__search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit" aria-label="검색">
            <SearchIcon size={16} stroke="#8b95a1" />
          </button>
        </form>
      </div>

      <PostCateList data={searchedResults} cate={cate} />
    </section>
  );
};

export default CateList;

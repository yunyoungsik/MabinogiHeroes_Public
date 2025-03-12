'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { SearchIcon } from 'lucide-react';
import timeAgo from '@/utils/timeAgo';
import Loading from '@/components/ui/Loading';
import { useAuthStore } from '@/store/useAuthStore';
import { usePostStore } from '@/store/usePostStore';
import PostPagenation from '../Pagenation/Pagenation';
import styles from './PostList.module.scss';

const PostNoticeList = ({ data, handleUserClick }) => {
  return (
    <div className={styles.list}>
      <ul>
        {data?.map((post) => (
          <li key={post._id}>
            <Link href={`/notice/${post._id}`}>
              <h2>{post.title}</h2>

              <div className={styles.info}>
                <p>{timeAgo(post.createdAt)}</p>
                <span>·</span>
                <p>조회수 {post.view}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PostList = ({ page }) => {
  // 검색
  const [searchText, setSearchText] = useState('');
  const [searchTimout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const { loading, allPosts, count, fetchPosts } = usePostStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    fetchPosts(page);
  }, [page, fetchPosts]);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterNotice(e.target.value);
        setSearchedResults(searchResult);
      }, 300)
    );
  };

  const handleUserClick = (user) => {
    setSearchText(user);

    const searchResult = filterNotice(user);
    setSearchedResults(searchResult);
  };

  // 페이지
  const postView = 10;

  const filterNotice = (searchtext) => {
    const regex = new RegExp(searchtext, 'i');
    return allPosts.filter(
      (item) =>
        regex.test(item.creator?.username) || regex.test(item.title) || regex.test(item.desc)
    );
  };

  if (loading) {
    return (
      <section className={styles.section}>
        <Loading />
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <form htmlFor="notice__search">
          <label htmlFor="notice__search">공지사항 검색</label>
          <input
            type="text"
            placeholder="검색"
            name="notice__search"
            id="notice__search"
            value={searchText}
            onChange={handleSearchChange}
            required
          />
          <button type="submit" aria-label="검색">
            <SearchIcon size={16} stroke="#8b95a1" />
          </button>
        </form>
        {authUser?.role === 'admin' && (
          <Link href="/notice-write" className={styles.write}>
            <span>글쓰기</span>
          </Link>
        )}
      </div>

      {searchText ? (
        <PostNoticeList data={searchedResults} handleUserClick={handleUserClick} />
      ) : (
        <PostNoticeList data={allPosts} handleUserClick={handleUserClick} />
      )}

      <PostPagenation page={page} count={count} postView={postView} />
    </section>
  );
};

export default PostList;

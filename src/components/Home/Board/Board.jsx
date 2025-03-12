'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
// components
import BoardLayout from './BoardLayout';
// store
import { useNoticeStore } from '@/store/useNoticeStore';
import { usePostStore } from '@/store/usePostStore';
// styles
import styles from './Board.module.scss';

const Board = () => {
  const { loading: noticeLoading, notice, patch, fetchNotice } = useNoticeStore();
  const { loading: postLoading, allPosts, fetchPosts } = usePostStore();

  // 마영전 공지
  useEffect(() => {
    if (notice.length === 0 || patch.length === 0) {
      fetchNotice();
    }
  }, [fetchNotice, notice.length, patch.length]);

  const combinedNoticePatch = [
    ...notice.map((item) => ({ ...item, type: item.type || 'notice' })),
    ...patch.map((item) => ({ ...item, type: 'patch' })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // MHON.KR 공지
  useEffect(() => {
    if (allPosts.length === 0) {
      fetchPosts(1);
    }
  }, [allPosts.length, fetchPosts]);

  const sliceNotice = allPosts?.slice(0, 5);

  return (
    <section className={styles.notice}>
      <h3>공지사항</h3>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.cate}>
            <a
              href="https://heroes.nexon.com/news/notice/list"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>마영전</span>
              <ChevronRight />
            </a>
          </div>
          <div className={styles.list}>
            <BoardLayout loading={noticeLoading} data={combinedNoticePatch} />
          </div>
        </div>

        <div className={styles.box}>
          <div className={styles.cate}>
            <Link href={'/notice'}>
              <span>MHON.KR</span>
              <ChevronRight />
            </Link>
          </div>

          <div className={styles.list}>
            <BoardLayout loading={postLoading} data={sliceNotice} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Board;

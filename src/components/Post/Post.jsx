'use client';

import { useState } from 'react';
import KakaoAd1 from '../AD/KakaoAd1';
import Category from './Category/Category';
import PostList from './List/PostList';
import styles from './Post.module.scss';
import KakaoAdSet from '../AD/KakaoAdSet';
import CateList from './CateList/CateList';

const Post = ({ page }) => {
  const [cate, setCate] = useState('mhNotice');
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <KakaoAd1 />
          <div className={styles.content}>
            <Category cate={cate} setCate={setCate} />
            {cate === 'mhNotice' ? (
              <PostList page={page} cate={cate} />
            ) : (
              <CateList cate={cate} />
            )}
          </div>
        </div>
      </main>

      <KakaoAdSet />
    </>
  );
};

export default Post;

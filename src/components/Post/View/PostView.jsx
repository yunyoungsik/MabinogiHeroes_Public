'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// components
import KakaoAd1 from '../../AD/KakaoAd1';
// utils
import timeAgo from '@/utils/timeAgo';
import { useScrollHandler } from '@/hooks/useScrollAd';
// store
import { usePostStore } from '@/store/usePostStore';
import { useAuthStore } from '@/store/useAuthStore';
import KakaoAdSet from '@/components/AD/KakaoAdSet';
import Loading from '@/components/ui/Loading';
import styles from './PostView.module.scss';
import LineButton from '@/components/ui/Button/LineButton';
import LinkLineButton from '@/components/ui/Button/LinkLineButton';
import LinkColorButton from '@/components/ui/Button/LinkColorButton';

const PostView = ({ postId }) => {
  const router = useRouter();
  const { loading, post: data, fetchPost, deletePost } = usePostStore();
  const { authUser } = useAuthStore();

  // const handleProfileClick = () => {
  //   if (post.creator._id === session?.user.id) return router.push('/profile');
  //   router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  // };

  useEffect(() => {
    fetchPost(postId);
  }, [postId, fetchPost]);

  // 삭제
  const handleDelete = async () => {
    const hasConfirmed = confirm('게시물을 정말로 삭제하시겠습니까?');

    if (hasConfirmed) {
      try {
        await deletePost(data._id.toString());
        router.push('/notice');
      } catch (error) {
        console.error('Notice Delete Error', error);
      }
    }
  };

  if (loading || !data || data.length === 0) {
    return (
      <main className={styles.main} style={{display: 'flex' , alignItems: 'center', justifyContent: 'center'}}>
        <Loading />
      </main>
    );
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <KakaoAd1 />

          <div className={styles.content}>
            <div className={styles.header}>
              <h2 className={styles.title}>{data?.title}</h2>
              <ul className={styles.info}>
                <li>
                  <span>{timeAgo(data.createdAt)}</span>
                </li>
                <li>
                  <span>조회수 {data?.view}</span>
                </li>
                <li>
                  <div>
                    <span>{data.creator?.username}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className={styles.desc}>
              <p>{data?.desc}</p>
            </div>

            <div className={styles.buttons}>
              <div className={styles.buttonGroup}>
                {data?.creator.email === authUser?.email && (
                  <>
                    <LinkLineButton
                      href={`/notice-update/${data?._id}`}
                      padding="var(--space-2) var(--space-3)"
                    >
                      수정
                    </LinkLineButton>

                    <LineButton handler={handleDelete} padding="var(--space-2) var(--space-3)">
                      삭제
                    </LineButton>
                  </>
                )}
                <LinkColorButton
                  href="/notice"
                  padding="var(--space-2) var(--space-3)"
                  color="var(--grey-500)"
                  backgroundColor="var(--grey-200)"
                  hoverColor="var(--grey-500)"
                  hoverBgColor="var(--grey-300)"
                >
                  목록으로
                </LinkColorButton>
              </div>
            </div>
          </div>
        </div>
      </main>

      <KakaoAdSet />
    </>
  );
};

export default PostView;

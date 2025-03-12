'use client';

import React, { useEffect, useState } from 'react';
import Form from '../Form/Form';
import { useRouter } from 'next/navigation';
import { usePostStore } from '@/store/usePostStore';
import styles from './PostUpdate.module.scss';

const PostNoticeUpdate = ({ postId }) => {
  const router = useRouter();
  const [post, setPost] = useState({ title: '', desc: '' });
  const [submitting, setIsSubmitting] = useState(false);
  const { post: findPost, fetchPost, patchPost } = usePostStore();

  useEffect(() => {
    if (postId) {
      fetchPost(postId);
    }
  }, [postId, fetchPost]);

  useEffect(() => {
    if (findPost) {
      setPost({
        title: findPost.title,
        desc: findPost.desc,
      });
    }
  }, [findPost]);

  const updatePost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!postId) return alert('게시물 아이디가 다릅니다.');

    try {
      const res = await patchPost({ postId, title: post.title, desc: post.desc });
      if (res.status === 200) {
        router.push('/notice');
      }
    } catch (error) {
      console.error('Notice Update Error', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.main}>
      <Form
        type="수정"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePost}
      />
    </main>
  );
};

export default PostNoticeUpdate;

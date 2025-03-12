'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// components
import Form from '../Form/Form';
// store
import { useAuthStore } from '@/store/useAuthStore';
import { usePostStore } from '@/store/usePostStore';
import styles from './PostWrite.module.scss';

const PostWrite = () => {
  const router = useRouter();
  const [post, setPost] = useState({ title: '', desc: '' });
  const [submitting, setIsSubmitting] = useState(false);
  const { writePost } = usePostStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser?.role !== 'admin') {
      if (typeof window !== 'undefined') {
        // 브라우저 환경에서만 라우터를 사용할 수 있습니다.
        router.push('/');
      }
    }
  }, [authUser, router]);

  const createPost = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await writePost({
        email: authUser?.email,
        username: authUser?.username,
        role: authUser?.role,
        title: post.title,
        desc: post.desc,
      });
      if (res.status === 200) {
        router.push('/notice');
      }
    } catch (error) {
      console.error('Notice Write Error', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.main}>
      <Form
        type="작성"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPost}
      />
    </main>
  );
};

export default PostWrite;

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// components
import LoginForm from './Form/LoginForm';
import SignupForm from './Form/SignupForm';
// store
import { useAuthStore } from '@/store/useAuthStore';
import styles from './Auth.module.scss';

const Auth = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const { authUser } = useAuthStore();

  if (authUser) return router.push('/');

  return (
    <main className={styles.auth}>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>ON.KR</h2>
            <p>MHON.KR에 오신것을 환영합니다.</p>
          </div>

          {isLogin ? <LoginForm /> : <SignupForm />}

          <div className={styles.footer}>
            <p>{isLogin ? '처음이신가요?' : '이미 계정이 있나요?'}</p>

            <button onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}>
              {isLogin ? '회원가입' : '로그인'}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Auth;

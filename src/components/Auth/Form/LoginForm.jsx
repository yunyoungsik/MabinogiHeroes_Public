'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LockKeyhole, UserRound } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import ButtonLoading from '@/components/ui/ButtonLoading';
import styles from './AuthForm.module.scss';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { loading, error, login } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await login({ email, password });
    if (user) {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleLogin} className={styles.authFrom}>
      {/* error */}
      {error && <p className={styles.error}>{error}</p>}

      {/* email */}
      <fieldset className={styles.fieldset}>
        <legend>이메일</legend>
        <label htmlFor="email">
          <UserRound stroke="#b0b8c1" size={24} />
        </label>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="이메일 주소"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </fieldset>

      {/* password */}
      <fieldset className={styles.fieldset}>
        <legend>비밀번호</legend>
        <label htmlFor="password">
          <LockKeyhole stroke="#b0b8c1" size={24} />
        </label>
        <input
          type={passwordVisible ? 'text' : 'password'}
          id="password"
          name="password"
          minLength={6}
          maxLength={16}
          placeholder="비밀번호"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          {passwordVisible ? (
            <Eye stroke="#b0b8c1" size={16} />
          ) : (
            <EyeOff stroke="#b0b8c1" size={16} />
          )}
        </button>
      </fieldset>

      <button
        type="submit"
        disabled={loading}
        className={styles.submitButton}
      >
        {loading ? <ButtonLoading />  : '로그인'}
      </button>
    </form>
  );
};

export default LoginForm;

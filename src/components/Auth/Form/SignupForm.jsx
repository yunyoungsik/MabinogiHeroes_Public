'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, IdCard, LockKeyhole, UserRound } from 'lucide-react';
import ButtonLoading from '@/components/ui/ButtonLoading';
import { useAuthStore } from '@/store/useAuthStore';
import styles from './AuthForm.module.scss';

const SignupForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { loading, error, signup } = useAuthStore();

  const isValidPassword = (password) => {
    // 숫자와 특수문자 포함, 대소문자 구분 없음
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidPassword(password)) {
      setErrorMessage('비밀번호는 8~16자이며, 숫자와 특수문자를 최소 1개 포함해야 합니다.');
      setTimeout(() => setErrorMessage(''), 10000);
      return;
    }

    const user = await signup({ email, password, username });
    if (user) {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.authFrom}>
      {/* error */}
      {(error || errorMessage) && (
        <p className={styles.error}>
          {error || errorMessage}
        </p>
      )}

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
          autoComplete="email"
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
          minLength={8}
          maxLength={16}
          placeholder="비밀번호(숫자와 특수문자를 최소 1개 포함)"
          autoComplete="new-password"
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

      {/* username */}
      <fieldset className={styles.fieldset}>
        <legend>닉네임</legend>
        <label htmlFor="username">
          <IdCard stroke="#b0b8c1" size={24} />
        </label>
        <div>
          <input
            type="text"
            id="username"
            name="username"
            minLength={2}
            maxLength={10}
            placeholder="닉네임"
            autoComplete="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </fieldset>

      {/* button */}
      <button
        type="submit"
        className={styles.submitButton}
        disabled={loading}
      >
        {loading ? <ButtonLoading /> : '회원가입'}
      </button>
    </form>
  );
};

export default SignupForm;

import Link from 'next/link';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <main className={styles.main}>
      <div className={styles.notFound}>
        <h2 className={styles.logo} aria-label="MHON.KR 로고">
          MHON.KR
        </h2>

        <p>페이지를 찾을 수 없습니다.</p>

        <Link href="/">메인으로</Link>
      </div>
    </main>
  );
};

export default NotFound;

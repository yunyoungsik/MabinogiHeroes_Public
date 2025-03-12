'use client';

import Link from 'next/link';
// components
import Nav from './Nav/Nav';
import Search from '../../ui/Input/Search';
import UserProfile from './UserProfile/UserProfile';
import styles from './Header.module.scss';
import TextBanner from './TextBanner/TextBanner';

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.left}>
            <Link href="/" aria-label="홈으로 이동">
              <h1 className={styles.logo}>ON.KR</h1>
            </Link>
            <Nav />
          </div>
          <div className={styles.search}>
            <Search />
          </div>

          <UserProfile />
        </div>
        <TextBanner />
      </header>
      <div className={styles.mobileSearch}>
        <Search />
      </div>
    </>
  );
};

export default Header;

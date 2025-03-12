'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { nav } from '@/constants/nav';
import styles from './Nav.module.scss';

const Nav = () => {
  const pathName = usePathname();
  const [isShow, setIsShow] = useState(false);

  const toggleMenu = () => {
    setIsShow((prevShow) => !prevShow);
  };

  return (
    <>
      <nav aria-label="주 메뉴" className={`${styles.nav} ${isShow ? styles.active : ''}`}>
        <ul className={styles.list}>
          {nav.map((el) => (
            <li key={el.name}>
              <Link
                href={el.href}
                className={`${styles.item} ${pathName.startsWith(el.href) ? styles.active : ''}`}
                onClick={toggleMenu}
              >
                {el.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        aria-label={isShow ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={isShow}
        aria-controls="main-nav"
        onClick={toggleMenu}
        className={styles.menu}
      >
        {isShow ? <X /> : <Menu />}
      </button>
    </>
  );
};

export default Nav;

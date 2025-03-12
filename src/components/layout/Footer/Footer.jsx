'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { footerNav, sns } from '@/constants/nav';
import styles from './Footer.module.scss';

const Footer = () => {
  const pathName = usePathname();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* nav */}
        <nav className={styles.nav} aria-label="푸터 내비게이션">
          <ul className={styles.navList}>
            {footerNav.map((el) => (
              <li key={el.name}>
                <Link
                  href={el.href}
                  target={el.target}
                  rel={el.target === '_blank' ? 'noopener noreferrer' : undefined}
                >
                  {el.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Social Links */}
          <ul className={styles.snsList}>
            {sns.map((el) => (
              <li key={el.name}>
                <Link
                  href={el.href}
                  target={el.target}
                  rel={el.target === '_blank' ? 'noopener noreferrer' : undefined}
                >
                  <span dangerouslySetInnerHTML={{ __html: el.src }} aria-hidden="true" />
                  <span>{el.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Copyright Information */}
        <address className={styles.copyright}>
          <p>© All Rights Reserved. ON.KR with NEXON Korea. Data based on NEXON Open API.</p>
        </address>
      </div>
    </footer>
  );
};

export default Footer;

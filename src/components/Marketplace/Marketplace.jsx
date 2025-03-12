'use client';

import MarketplaceSection from './MarketplaceSection';
import KakaoAdSet from '../AD/KakaoAdSet';
import styles from './Marketplace.module.scss';

const Marketplace = () => {
  return (
    <>
      <main className={styles.main}>
        <MarketplaceSection />
      </main>

      <KakaoAdSet />
    </>
  );
};

export default Marketplace;

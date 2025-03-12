import KakaoAd1 from '../AD/KakaoAd1';
import KakaoAdSet from '../AD/KakaoAdSet';
import EnchantSection from './EnchantSection';
import styles from './Enchant.module.scss';

const Enchant = () => {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <KakaoAd1 />
          <div className={styles.content}>
            <EnchantSection />
          </div>
        </div>
      </main>
      <KakaoAdSet />
    </>
  );
};

export default Enchant;

import KakaoAd1 from '../AD/KakaoAd1';
import RaidSection from './RaidSection';
import KakaoAdSet from '../AD/KakaoAdSet';
import styles from './Raid.module.scss';

const Raid = () => {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <KakaoAd1 />
          <div className={styles.content}>
            <RaidSection />
          </div>
        </div>
      </main>

      <KakaoAdSet />
    </>
  );
};

export default Raid;

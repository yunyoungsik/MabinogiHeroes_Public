import KakaoAd1 from '../AD/KakaoAd1';
import KakaoAdSet from '../AD/KakaoAdSet';
import StatisticsSection from './StatisticsSection';
import styles from './Statistics.module.scss';

const Statistics = () => {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <KakaoAd1 />
          <div className={styles.content}>
            <StatisticsSection />
          </div>
        </div>
      </main>

      <KakaoAdSet />
    </>
  );
};

export default Statistics;

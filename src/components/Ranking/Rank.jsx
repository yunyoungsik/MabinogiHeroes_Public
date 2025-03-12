import KakaoAd1 from '../AD/KakaoAd1';
import KakaoAdSet from '../AD/KakaoAdSet';
import RankSection from './RankSection';
import styles from './Rank.module.scss';

const Rank = () => {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
            <KakaoAd1 />
            <RankSection />
        </div>
      </main>

      <KakaoAdSet />
    </>
  );
};

export default Rank;

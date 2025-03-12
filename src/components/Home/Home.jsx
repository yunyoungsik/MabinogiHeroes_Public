import Hero from '@/components/Home/Hero/Hero';
import Event from '@/components/Home/Event/Event';
import Ranking from '@/components/Home/Ranking/Ranking';
import Board from '@/components/Home/Board/Board';
import Chzzk from '@/components/Home/Chzzk/Chzzk';
import KakaoAd1 from '@/components/AD/KakaoAd1';
import KakaoAdSet from '@/components/AD/KakaoAdSet';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.content}>
            <Hero />
            <Event />
            <KakaoAd1 />
            <Chzzk />
            <Board />
          </div>

          <aside className={styles.aside}>
            <Ranking />
          </aside>
        </div>
      </main>

      <KakaoAdSet />
    </>
  );
};

export default Home;

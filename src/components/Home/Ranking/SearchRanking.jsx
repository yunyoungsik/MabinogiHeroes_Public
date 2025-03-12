import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getStandardTime } from '@/utils/getStandardTime';
import { getKoreanDate } from '@/utils/getKoreanDate';
import TextButton from '@/components/ui/Button/TextButton';
import Loading from '@/components/ui/Loading';
import styles from './Ranking.module.scss';
import { usePageViewStore } from '@/store/usePageViewStore';

const SearchRanking = () => {
  const today = getKoreanDate();
  const { loading, views, fetchViews } = usePageViewStore();
  const [type, setType] = useState(0); // 0: 오늘 기준, 1: 전체 기준

  useEffect(() => {
    if (views.length === 0) {
      fetchViews();
    }
  }, []);

  const sortedViews = views
    .filter((view) => {
      if (type === 0) {
        return view.lastUpdated === today;
      }
      return true; // 전체 기준일 때는 필터링하지 않음
    })
    .sort((a, b) => {
      if (type === 0) {
        return b.todayViews - a.todayViews;
      } else {
        return b.totalViews - a.totalViews;
      }
    });

  // 상위 5개 데이터만 가져오기
  const dataToDisplay = sortedViews.slice(0, 5);

  if (!views || views.length === 0) {
    return (
      <section className={styles.ranking}>
        <div className={styles.title}>
          <h3>인기랭킹</h3>
          <span>오늘 {getStandardTime()} 기준</span>
        </div>
        <nav className={styles.nav}>
          <div className={styles.type}>
            {['오늘', '전체'].map((label, typeIndex) => (
              <TextButton
                key={label}
                active={type === typeIndex}
                text={label}
                handler={() => setType(typeIndex)}
              />
            ))}
          </div>
        </nav>
        <ul className={styles.list}>
          <li>
            <Loading />
          </li>
        </ul>
      </section>
    );
  }

  return (
    <section className={styles.ranking}>
      <div className={styles.title}>
        <h3>인기랭킹</h3>
        <span>오늘 {getStandardTime()} 기준</span>
      </div>
      <nav className={styles.nav}>
        <div className={styles.type}>
          {['오늘', '전체'].map((label, typeIndex) => (
            <TextButton
              key={label}
              active={type === typeIndex}
              text={label}
              handler={() => setType(typeIndex)}
            />
          ))}
        </div>
      </nav>
      <ul className={styles.list}>
        {loading || !views || views.length === 0 ? (
          <li>
            <Loading />
          </li>
        ) : (
          dataToDisplay.map((item, index) => (
            <li key={item.name}>
              <strong>{index + 1}</strong>
              <Link href={`/user/${item.name}`}>{item.name}</Link>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default SearchRanking;

'use client';

import { useEffect } from 'react';
import Loading from '@/components/ui/Loading';
import { useBroadcastStore } from '@/store/useBroadcastStore';
import styles from './Chzzk.module.scss';

const Chzzk = () => {
  const { loading, error, chzzk, fetchChzzk } = useBroadcastStore();

  useEffect(() => {
    if (!chzzk || chzzk.length === 0) {
      fetchChzzk();
    }
  }, []);

  if (loading) {
    return (
      <section className={styles.chzzk}>
        <h3>치지직 라이브</h3>
        <div className={styles.container}>
          <ul className={styles.list}>
            <li>
              <Loading />
            </li>
          </ul>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.chzzk}>
        <h3>치지직 라이브</h3>
        <div className={styles.container}>
          <ul className={styles.list}>
            <li>
              <div className={styles.noLive}>
                <span>{error}</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
    );
  }

  if (!chzzk || chzzk.length === 0) {
    return (
      <section className={styles.chzzk}>
        <h3>치지직 라이브</h3>
        <div className={styles.container}>
          <ul className={styles.list}>
            <li>
              <div className={styles.noLive}>
                <span>진행중인 방송이 없습니다.</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.chzzk}>
      <h3>치지직 라이브</h3>

      <div className={styles.container}>
        <ul className={styles.list}>
          {}
          {chzzk?.map((item) => {
            // 썸네일 이미지 URL 생성
            const thumbnailUrl = item.liveThumbnailImageUrl.replace('{type}', '480');

            return (
              <li
                key={item.channelId}
                style={{ backgroundImage: `url(${thumbnailUrl})` }} // 생성한 URL을 사용
              >
                <a
                  href={`https://chzzk.naver.com/live/${item.channelId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={styles.info}>
                    <div className={styles.bedge}>
                      <span className={styles.live}>LIVE</span>
                      <span className={styles.viewrShip}>
                        {item.concurrentUserCount.toLocaleString()}
                      </span>
                    </div>
                    {item.adult && <span className={styles.adult}>19</span>}

                    <div className={styles.streamer}>
                      <h4 className={styles.title}>{item.liveTitle}</h4>
                      <span className={styles.name}>{item.channelName}</span>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Chzzk;

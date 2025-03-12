'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useNoticeStore } from '@/store/useNoticeStore';
import convertTime from '@/utils/convertTime';
import ButtonLoading from '@/components/ui/ButtonLoading';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Event.module.scss';

const Event = () => {
  const { loading, event, fetchNotice } = useNoticeStore();

  useEffect(() => {
    if (event?.length === 0) {
      fetchNotice();
    }
  }, [fetchNotice, event?.length]);

  if (loading || event?.length === 0) {
    return (
      <section className={styles.event} />
    )
  }

  return (
    <section className={styles.event}>
      <h3>이벤트</h3>
      <span>·</span>
      <Swiper
        direction={'vertical'}
        modules={[Autoplay]}
        slidesPerView={1}
        loop={event.length > 1 ? true : false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className={`mySwiper ${styles.slider}`}
      >
        {event.map((item) => (
          <SwiperSlide key={item.url}>
            <Link href={item.url}>
              <h4>{item.title}</h4>
              {(item.date_event_start || item.date_event_end) && (
                <p>
                  {item.date_event_start && (
                    <span>{convertTime(item.date_event_start).split(' ')[0]}</span>
                  )}

                  {item.date_event_start && item.date_event_end && <span>~</span>}

                  {item.date_event_end && (
                    <span>{convertTime(item.date_event_end).split(' ')[0]}</span>
                  )}
                </p>
              )}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Event;

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';
import { mainSlider } from '@/constants/slider';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Hero.module.scss';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <Swiper
        pagination={{
          clickable: true,
          // el: '.custom-pagination',
          // type: 'custom',
          // renderCustom: (swiper, current, total) => `${current} / ${total}`,
        }}
        modules={[Pagination, Autoplay, Navigation]}
        slidesPerView={'auto'}
        navigation={true}
        loop={mainSlider.length > 1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className={`mySwiper ${styles.slider}`}
      >
        {mainSlider.map((item, index) => (
          <SwiperSlide key={index}>
            <Link href={item.link}>
              <div className={styles.imageWrapper}>
                <Image src={item.src} alt={item.alt} fill priority={true} />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 커스텀 페이지네이션 표시 */}
      {/* <div className={styles.paginationBox}>
        <div className="custom-pagination"></div>
      </div> */}
    </section>
  );
};

export default Hero;

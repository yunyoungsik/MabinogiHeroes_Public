'use client';

import { useEffect, useState } from 'react';
// components
import KakaoAd1 from '../AD/KakaoAd1';
import KakaoAdSet from '../AD/KakaoAdSet';
import Loading from '../ui/Loading';
import CharacterNavigation from './Navigation/CharacterNavigation';
import CharacterStat from './Stat/CharacterStat';
import CharacterItem from './Item/CharacterItem';
import CharacterSkill from './Skill/CharacterSkill';
import CharacterAvatar from './Avatar/CharacterAvatar';
// store
import { useUserStore } from '@/store/useUserStore';
// styles
import styles from './Character.module.scss';

const Character = ({ name }) => {
  const [cate, setCate] = useState('item');
  const { loading, error, fetchUser } = useUserStore();

  useEffect(() => {
    if (name) {
      fetchUser(name);
    }
  }, [name, fetchUser]);

  
  if (loading) {
    return (
      <main
        className={styles.main}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Loading />
      </main>
    );
  }

  if (error) {
    return (
      <main
        className={styles.main}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div className={styles.notFound} role="alert">
          <h2 className={styles.logo}>MHON.KR</h2>
          <p>해당하는 캐릭터의 검색 결과가 없습니다.</p>
          <span>캐릭터 명을 다시 한번 확인하시고 재시도 해주세요.</span>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <KakaoAd1 />
          <div className={styles.content}>
            <CharacterNavigation cate={cate} setCate={setCate} />
            {cate === 'stat' && <CharacterStat name={name} />}
            {cate === 'item' && <CharacterItem />}
            {cate === 'avatar' && <CharacterAvatar />}
            {cate === 'skill' && <CharacterSkill />}
          </div>
        </div>
      </main>

      <KakaoAdSet />
    </>
  );
};

export default Character;

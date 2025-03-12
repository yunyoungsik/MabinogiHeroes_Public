'use client';

import { useCallback, useEffect, useState } from 'react';
import { Search, Settings2 } from 'lucide-react';
import RaidList from '@/data/raid.json';
import RaidDropdown from './Dropdown/RaidDropdown';
import styles from './Raid.module.scss';
import { useUserStore } from '@/store/useUserStore';
import Loading from '../ui/Loading';
import RaidLayout from './RaidLayout/RaidLayout';

const RaidSection = () => {
  const [region, setRegion] = useState('전체');
  const [boss, setBoss] = useState('전체');
  const [bossOptions, setBossOptions] = useState(['전체']);
  const [bossStat, setBossStat] = useState({});
  const [name, setName] = useState('');
  const [party, setParty] = useState([]);
  const { loading, fetchUser } = useUserStore();

  useEffect(() => {
    let filteredBosses;

    // region이 전체일 경우 모든 보스 이름을 가져옴
    if (region === '전체') {
      filteredBosses = [...new Set(RaidList.map((raid) => raid.bossName))];
    } else {
      // 특정 지역일 경우 해당 지역의 보스 이름만 가져옴
      filteredBosses = [
        ...new Set(RaidList.filter((raid) => raid.region === region).map((raid) => raid.bossName)),
      ];
    }

    setBossOptions(['전체', ...filteredBosses]);
    setBoss('전체'); // 지역 변경 시 보스 초기화
  }, [region]);

  useEffect(() => {
    if (boss !== '전체') {
      const selectedBoss = RaidList.find((raid) => raid.bossName === boss);
      setBossStat(selectedBoss);
    } else {
      setBossStat({});
    }
  }, [boss]);

  // 검색 핸들러
  const handleSearch = useCallback(async () => {
    if (!name) {
      alert('캐릭터명을 입력하세요.'); // 공백 입력 처리
      return;
    }

    // 사용자 데이터를 가져오는 함수 호출
    await fetchUser(name.trim());

    // loading 상태가 false가 될 때까지 대기
    const checkLoading = setInterval(() => {
      const currentLoading = useUserStore.getState().loading;
      if (!currentLoading) {
        clearInterval(checkLoading); // 로딩이 끝나면 인터벌 종료

        // Zustand에서 데이터 가져오기
        const basic = useUserStore.getState().basic;
        const guild = useUserStore.getState().guild;
        const stat = useUserStore.getState().stat;

        const basiccharacter_name = basic.character_name;
        const character_class = basic.character_class_name;
        const guild_name = guild.guild_name;

        // 중복 확인 후 party에 추가
        if (!party.some((member) => member.name === basiccharacter_name)) {
          setParty((prevParty) => [
            ...prevParty,
            {
              name: basiccharacter_name,
              class: character_class,
              guild: guild_name,
              cairde: basic.cairde_name,
              stat,
            },
          ]);
        } else {
          alert('이미 추가된 사용자입니다.');
        }
      }
    }, 100); // 100ms마다 로딩 상태 확인
  }, [name, fetchUser, party]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 캐릭터 삭제 핸들러
  const handleDelete = (name) => {
    setParty((prevParty) => prevParty.filter((item) => item.name !== name));
  };

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <h2>상한계산기</h2>
        <p>캐릭터 이름만 입력하면 레이드 상한을 쉽게 계산할 수 있습니다.</p>
      </div>

      <div className={styles.nav}>
        <div className={styles.filter}>
          <div className={styles.filterTitle}>
            <Settings2 width={14} hanging={14} stroke="#6b7684" />
            <span>필터</span>
          </div>

          <div className={styles.filterList}>
            <RaidDropdown
              cate={region}
              setCate={setRegion}
              options={['전체', '와드네', '시공간', '오르나', '아르드리', '결사대']}
            />
            <RaidDropdown cate={boss} setCate={setBoss} options={bossOptions} />
          </div>
        </div>

        <div className={styles.search}>
          <label htmlFor="item-search">아이템 검색</label>
          <input
            id="item-search"
            type="text"
            autoComplete="off"
            placeholder="캐릭터명을 입력하세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch} disabled={loading} aria-label="검색">
            <Search size={14} stroke="#8b95a1" />
          </button>
        </div>
      </div>

      <RaidLayout party={party} bossStat={bossStat} handleDelete={handleDelete} />
    </section>
  );
};

export default RaidSection;

'use client';

import { useEffect, useState } from 'react';
import { Settings2 } from 'lucide-react';
// components
import EnchantLayout from './Layout/EnchantLayout';
import EnchantDropdown from './Dropdown/EnchantDropdown';
import Loading from '@/components/ui/Loading';
// store
import { useMarketplaceStore } from '@/store/useMarketplaceStore';
// data
import enchantList from '@/data/enchant.json';
// styles
import styles from './Enchant.module.scss';

const EnchantSection = () => {
  const [rank, setRank] = useState('전체');
  const [preset, setPreset] = useState('전체');
  const [slot, setSlot] = useState('전체');
  const { loading, marketEnchant, fetchEnchat } = useMarketplaceStore();

  useEffect(() => {
    if (!marketEnchant || marketEnchant.length === 0) fetchEnchat();
  }, [marketEnchant, marketEnchant.length, fetchEnchat]);

  // 최신 항목만 필터링
  const latestItems = marketEnchant.reduce((acc, item) => {
    // suffix와 prefix 중 존재하는 값 사용
    const optionKey =
      item.item_option?.suffix_enchant_preset_1 || item.item_option?.prefix_enchant_preset_1;

    if (!optionKey) return acc; // 옵션 키가 없으면 스킵

    // 같은 optionKey가 없거나 date_update가 더 최신이면 덮어쓰기
    if (!acc[optionKey] || new Date(item.date_update) > new Date(acc[optionKey].date_update)) {
      acc[optionKey] = item;
    }

    return acc;
  }, {});

  // 객체를 배열로 변환
  const filteredEnchant = Object.values(latestItems);

  const filteredEnchantList = enchantList.filter((item) => {
    const rankCheck = rank === '전체' || item.rank === rank;
    const presetCheck = preset === '전체' || item.preset === preset;
    const slotCheck = slot === '전체' || item.slot?.includes(slot);

    return rankCheck && presetCheck && slotCheck;
  });

  if (loading) {
    return (
      <section
        className={styles.section}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loading />
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <h2>인챈트</h2>
        <p>최근 24시간 내 10건 이상의 거래가 발생한 아이템의 거래 기록이 조회됩니다.</p>
      </div>

      <div className={styles.filter}>
        <div className={styles.filterTitle}>
          <Settings2 width={14} hanging={14} stroke="#6b7684" />
          <span>필터</span>
        </div>
        <div className={styles.filterList}>
          <EnchantDropdown
            cate={rank}
            setCate={setRank}
            options={['전체', '4', '5', '6', '7', '8', '9', 'A']}
          />
          <EnchantDropdown cate={preset} setCate={setPreset} options={['전체', '접두', '접미']} />
          <EnchantDropdown
            cate={slot}
            setCate={setSlot}
            options={[
              '전체',
              '주무기',
              '가슴',
              '머리',
              '다리',
              '손',
              '발',
              '보조장비',
              '반지(R)',
              '반지(L)',
              '허리띠',
              '귀걸이',
              '브로치',
              '목걸이',
              '아티팩트',
            ]}
          />
        </div>
      </div>

      <EnchantLayout loading={loading} data={filteredEnchant} enchantList={filteredEnchantList} />
    </section>
  );
};

export default EnchantSection;

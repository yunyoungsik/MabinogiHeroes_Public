'use client';

import React, { useEffect, useMemo } from 'react';
import { useEnchantStore } from '@/store/useEnchantStore';
import { useUserStore } from '@/store/useUserStore';
import enchantList from '@/data/enchant.json';
import styles from './CharacterItem.module.scss';

const CharacterItem = () => {
  const { itemEquipment } = useUserStore();
  // const { enchant, fetchEnchant } = useEnchantStore();

  const data = itemEquipment?.filter((item) => item.item_equipment_page === 'Bag') || [];

  // useEffect(() => {
  //   const fetchEnchantsSequentially = async () => {
  //     if (!data) return;

  //     for (const item of data) {
  //       const prefixNo = item.item_option.prefix_enchant_use_preset_no;
  //       const suffixNo = item.item_option.suffix_enchant_use_preset_no;

  //       const prefixEnchant = item.item_option[`prefix_enchant_preset_${prefixNo}`];
  //       const suffixEnchant = item.item_option[`suffix_enchant_preset_${suffixNo}`];

  //       if (prefixEnchant) {
  //         await fetchEnchant({ type: 0, enchantName: prefixEnchant });
  //       }
  //       if (suffixEnchant) {
  //         await fetchEnchant({ type: 1, enchantName: suffixEnchant });
  //       }
  //     }
  //   };

  //   fetchEnchantsSequentially();
  // }, [fetchEnchant]);

  const itemMapping = useMemo(
    () => ({
      'Right Hand': '무기',
      'Left Hand': '수호부',
      Head: '머리',
      Upper: '가슴',
      Lower: '다리',
      Hand: '손',
      Leg: '발',
      'Right Finger': '반지(오른손)',
      'Left Finger': '반지(왼손)',
      Earring: '귀걸이',
      Belt: '허리띠',
      Charm: '장신구',
      Artifact: '아티팩트',
      'Right Wrist': '팔찌(오른손)',
      'Left Wrist': '팔찌(왼손)',
      SubWeapon: '보조 무기',
      Necklace: '목걸이',
      Rhod: '로드',
    }),
    []
  );

  const renderEnchant = (item_option) => {
    const prefixKey = `prefix_enchant_preset_${item_option.prefix_enchant_use_preset_no}`;
    const suffixKey = `suffix_enchant_preset_${item_option.suffix_enchant_use_preset_no}`;

    const prefixEnchant = item_option?.[prefixKey];
    const suffixEnchant = item_option?.[suffixKey];

    // 인챈트가 모두 없으면 아무것도 출력하지 않음
    if (!prefixEnchant && !suffixEnchant) return null;

    return (
      <>
        {prefixEnchant && (
          <span className={styles.enchant}>
            {prefixEnchant}
            {/* {renderEnchatStat(prefixEnchant, enchant)} */}
            {renderEnchatStat(prefixEnchant)}
          </span>
        )}
        {suffixEnchant && (
          <span className={styles.enchant}>
            {suffixEnchant}
            {/* {renderEnchatStat(suffixEnchant, enchant)} */}
            {renderEnchatStat(suffixEnchant)}
          </span>
        )}
      </>
    );
  };

  const renderEnchatStat = (enchantName, enchant) => {
    // const currentEnchant = enchant[enchantName];
    const currentEnchant = enchantList.find((enchant) => enchant.name === enchantName);
    if (!currentEnchant) return null;

    return (
      <ul className={styles.ballon}>
        {/* <li>인챈트등급 {currentEnchant.enchant_grade}</li> */}
        <li>인챈트등급 {currentEnchant.rank}</li>
        {currentEnchant.stat.map((stat, index) => (
          <li key={index}>{stat}</li>
        ))}
      </ul>
    );
  };

  const renderStats = (stats) => (
    <ul className={styles.effect}>
      <li className={styles.effectTitle}>연마</li>
      {stats.map((stat, index) => (
        <li key={index} className={styles.effectStat}>
          <span>{stat.stat_name}</span>
          <span>{stat.stat_value}</span>
        </li>
      ))}
    </ul>
  );

  const renderAbility = (ability) => (
    <ul className={styles.effect}>
      <li className={styles.effectTitle}>어빌리티</li>
      <li className={styles.effectStat}>{ability}</li>
    </ul>
  );

  const renderPowerInfusion = (item, presetNo) => {
    const presetKey = `power_infusion_preset_${presetNo}`;
    const preset = item?.item_option[presetKey];
    return (
      preset && (
        <ul className={styles.effect}>
          <li className={styles.effectTitle}>정령합성</li>
          <li className={styles.effectStat}>
            <span>{preset?.stat_name || '-'}</span>
            <span>{preset?.stat_value || '-'}</span>
          </li>
        </ul>
      )
    );
  };

  const renderItem = (itemSlot) => {
    const foundItem = data.find((item) => item.item_equipment_slot_name === itemSlot);
    if (!foundItem) {
      return (
        <li key={itemSlot} className={styles.item}>
          <div>
            <span className={styles.slot}>{itemMapping[itemSlot]}</span>
          </div>
        </li>
      );
    }

    const { item_option } = foundItem;
    const prefixNo = item_option.prefix_enchant_use_preset_no;
    const suffixNo = item_option.suffix_enchant_use_preset_no;

    const prefixEnchant = item_option[`prefix_enchant_preset_${prefixNo}`];
    const suffixEnchant = item_option[`suffix_enchant_preset_${suffixNo}`];

    return (
      <li key={itemSlot} className={styles.item}>
        <div className={styles.itemTop}>
          <div className={styles.itemImage}></div>
          <div className={styles.itemName}>
            {foundItem.item_option.enhancement_level && (
              <span>+{foundItem.item_option.enhancement_level}</span>
            )}
            {renderEnchant(item_option, prefixEnchant, suffixEnchant)}
            <span>{foundItem.item_name}</span>
          </div>
        </div>

        <div className={styles.slot}>
          <span>{itemMapping[itemSlot]}</span>
        </div>

        {item_option.ability_name && renderAbility(item_option.ability_name)}
        {item_option.power_infusion_use_preset_no &&
          renderPowerInfusion(foundItem, item_option.power_infusion_use_preset_no)}
        {item_option.tuning_stat?.length > 0 && renderStats(item_option.tuning_stat)}
      </li>
    );
  };

  const itemSlots = [
    'Earring',
    'Head',
    'Necklace',
    'Right Hand',
    'Upper',
    'Left Hand',
    'SubWeapon',
    'Lower',
    'Hand',
    'Belt',
    'Leg',
    'Charm',
    'Right Finger',
    'Artifact',
    'Left Finger',
    'Right Wrist',
    'Rhod',
    'Left Wrist',
  ];

  return (
    <section className={styles.section} aria-labelledby="item-section-title">
      <div className={styles.title}>
        <h2>장비</h2>
      </div>

      <ul className={styles.list}>{itemSlots.map(renderItem)}</ul>
    </section>
  );
};

export default CharacterItem;

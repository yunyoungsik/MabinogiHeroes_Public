import { useUserStore } from '@/store/useUserStore';
import styles from './CharacterAvatar.module.scss';

const itemMapping = {
  Hair: '헤어(아바타)',
  MakeUp: '메이크업',
  Lens: '렌즈',
  Avatar_Helm: '머리(아바타)',
  Avatar_Tunic: '가슴(아바타)',
  Avatar_Pants: '다리(아바타)',
  Avatar_Gloves: '손(아바타)',
  Avatar_Boots: '발(아바타)',
  Avatar_Rear: '등(아바타)',
  Avatar_Tail: '꼬리(아바타)',
  Avatar_Weapon: '무기(아바타)',
  FacePainting: '페이스페인팅',
  BodyPainting: '바디페인팅',
  'Inner Armor': '이너아머',
  'Body Shape': '체형',
  Badge: '배지',
  'Right Epaulet': '견장',
};

const itemSlots = [
  'MakeUp',
  'Hair',
  'FacePainting',
  'Lens',
  'Badge',
  'Right Epaulet',
  'Body Shape',
  'Inner Armor',
  'BodyPainting',
  'Avatar_Weapon',
  'Avatar_Helm',
  'Avatar_Tail',
  'Avatar_Rear',
  'Avatar_Tunic',
  'Avatar_Gloves',
  'Avatar_Pants',
  'Avatar_Boots',
];

const CharacterAvatar = () => {
  const { itemEquipment } = useUserStore();
  const data = itemEquipment?.filter((item) => item.item_equipment_page === 'Cash') || [];

  // 아바타 항목
  const renderItem = (itemSlot) => {
    const foundItem = data.find((item) => item.item_equipment_slot_name === itemSlot);

    if (!itemMapping[itemSlot]) return null;

    return (
      <li className={styles.item} key={itemSlot}>
        <div className={styles.itemTop}>
          <div className={styles.itemImage}></div>
          {foundItem && (
            <div className={styles.itemName}>
              <p> {foundItem.item_name}</p>
            </div>
          )}
        </div>

        <div className={styles.slot}>
          <span>{itemMapping[itemSlot]}</span>
        </div>

        {foundItem?.item_option?.cash_item_color &&
          renderColors(foundItem.item_option.cash_item_color)}
      </li>
    );
  };

  // 색상
  const renderColors = (colors) => (
    <ul className={styles.effect}>
      {Object.entries(colors).map(([key, color]) => (
        <li key={key} className={styles.effectStat}>
          <span>{`색상파트 ${key.split('_')[1]}`}</span>
          <span
            className={styles.effectDesc}
            style={{ backgroundColor: `rgb(${color})` }}
            aria-label={`색상: ${color}`}
          ></span>
          <span>{color}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <h2>아바타</h2>
      </div>
      <ul className={styles.list}>{itemSlots.map((slot) => renderItem(slot))}</ul>
    </section>
  );
};

export default CharacterAvatar;

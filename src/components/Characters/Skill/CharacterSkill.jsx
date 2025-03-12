import { useUserStore } from '@/store/useUserStore';
import styles from './CharacterSkill.module.scss';

const CharacterSkill = () => {
  const { basic } = useUserStore();
  const data = basic?.skill_awakening || [];

  return (
    <section className={styles.section} aria-labelledby="skill-section-title">
      <div className={styles.title}>
        <h2>스킬</h2>
      </div>
      <ul className={styles.list}>
        {data?.map((skill, index) => (
          <li key={index} className={styles.item}>
            <div className={styles.itemTop}>
              <div className={styles.itemImage}></div>
              <div className={styles.effect}>
                <p className={styles.itemName}>{skill.skill_name || '-'}</p>
                <p className={styles.effectStat}>{skill.item_name || '-'}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CharacterSkill;

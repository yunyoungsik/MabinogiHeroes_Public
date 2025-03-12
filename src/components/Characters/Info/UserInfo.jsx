import { useUserStore } from '@/store/useUserStore';
import { Info } from 'lucide-react';
import styles from './UserInfo.module.scss';
import convertTime from '@/utils/convertTime';
import timeAgo from '@/utils/timeAgo';
import { usePageViewStore } from '@/store/usePageViewStore';
import { useEffect } from 'react';

// 캐릭터 백그라운드 이미지
const CLASS_ENGLISH_MAP = {
  네반: 'neamhain',
  사냐: 'sanyaa',
  소우: 'sou',
  아켈: 'achel',
  체른: 'czern',
  라티야: 'latiya',
  레티: 'letty',
  단아: 'danah',
  테사: 'tessa',
  카엘: 'kael',
  레서: 'lethor',
  벨: 'bel',
  미울: 'miul',
  그림덴: 'grimden',
  미리: 'miri',
  델리아: 'delia',
  헤기: 'hagie',
  아리샤: 'arisha',
  린: 'lynn',
  허크: 'hurk',
  벨라: 'vella',
  카이: 'kay',
  카록: 'kalok',
  이비: 'evy',
  피오나: 'fiona',
  리시타: 'lethita',
};

const UserInfo = () => {
  const { basic, guild } = useUserStore();

  const { fetchView } = usePageViewStore();


  useEffect(() => {
    if (basic?.character_name) {
      fetchView(basic?.character_name);
    }
  }, [basic, fetchView]);


  const getCharacterName = (className) => CLASS_ENGLISH_MAP[className] || '';

  const isOnline =
    basic?.character_date_last_login &&
    basic?.character_date_last_logout &&
    new Date(basic.character_date_last_login) > new Date(basic.character_date_last_logout);

  return (
    <div className={styles.userInfo}>
      <div
        className={styles.container}
        style={{
          backgroundImage: `url(/image/character/${getCharacterName(
            basic?.character_class_name
          )}.webp)`,
        }}
      >
        <div className={styles.inner}>
          <div className={styles.textBox}>
            <div className={styles.top}>
              <div className={styles.topInner}>
                <div className={styles.level}>
                  {/* 레벨 */}
                  <span>Lv.{basic?.character_level}</span>
                  {/* 직업 */}
                  <span>{basic?.character_class_name}</span>
                </div>
                {/* 접속상태 */}
                <div className={`${styles.login} ${isOnline ? styles.online : styles.offline}`}>
                  {isOnline
                    ? '접속중'
                    : `${timeAgo(convertTime(basic?.character_date_last_logout))}`}
                </div>
              </div>
              {/* 캐릭터명 */}
              <h2 className={styles.name}>{basic?.character_name}</h2>
            </div>

            <div className={styles.bottom}>
              <ul>
                <li>
                  <span>길드</span> <span>{guild?.guild_name}</span>
                </li>
                <li className={styles.title}>
                  <span>보유타이틀</span> <span>{basic?.total_title_count}개</span>
                  <Info size={14} stroke="#8b95a1" />
                  <div className={styles.ballon}>
                    {basic?.title_stat?.map((stat, index) => (
                      <p key={index}>
                        <span>{stat.stat_name}</span>
                        <span>{stat.stat_value}</span>
                      </p>
                    ))}
                  </div>
                </li>
                <li>
                  <span>카르제</span> <span>{basic?.cairde_name}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;

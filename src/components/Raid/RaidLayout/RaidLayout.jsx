import { X } from 'lucide-react';
import styles from './RaidLayout.module.scss';

const RaidLayout = ({ party, bossStat, handleDelete }) => {
  // 특정 스탯 이름에 대한 값을 찾는 함수
  const currentStat = (name, statName) => {
    const currentUser = party.find((item) => item.name === name);
    return currentUser && currentUser.stat
      ? currentUser.stat.find((item) => item.stat_name === statName)?.stat_value || 0
      : 0;
  };

  // 스탯에 따른 클래스 이름 반환 함수
  const getStatClass = (name, statName, cap) => {
    const statValue = Number(currentStat(name, statName));
    if (statValue > cap) return styles.high;
    if (statValue < cap) return styles.low;
    return '';
  };

  // 차이를 계산하고, 양수라면 +를 붙임
  const formatDiff = (diff) =>
    diff > 0 ? `+${diff.toLocaleString('ko-KR')}` : diff.toLocaleString('ko-KR');

  return (
    <div className={styles.raidLayout}>
      <table>
        <colgroup>
          {Array.from({ length: 10 }).map((_, i) => (
            <col key={i} />
          ))}
        </colgroup>

        <thead>
          <tr>
            <th>닉네임(카르제)</th>
            <th>직업</th>
            <th>길드</th>
            <th>공격력</th>
            <th>마법공격력</th>
            <th>제한해제</th>
            <th>크리티컬</th>
            <th>크리티컬저항</th>
            <th>대항력</th>
            <th>밸런스</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {party.map((item) => (
            <tr key={item.name}>
              <td>
                <div className={styles.tdInner}>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.cairde}>({item.cairde})</span>
                </div>
              </td>
              <td>
                <div className={styles.tdInner}>
                  <span className={styles.class}>{item.class}</span>
                </div>
              </td>
              <td>
                <div className={styles.tdInner}>
                  <span className={styles.guild}>{item.guild}</span>
                </div>
              </td>

              {[
                ['공격력', bossStat.damageCap],
                ['마법공격력', bossStat.damageCap],
                ['공격력 제한 해제', 0],
                ['크리티컬', bossStat.criticalCap],
                ['크리티컬 저항', bossStat.criticalResistanceCap],
                ['대항력', bossStat.defenseCap],
                ['밸런스', bossStat.balanceCap],
              ].map(([statName, cap]) => {
                const statValue = currentStat(item.name, statName);
                const diff = statValue - cap;
                return (
                  <td key={statName}>
                    <div className={styles.tdInner}>
                      <span>{Number(statValue).toLocaleString('ko-KR')}</span>
                      {statName !== '공격력 제한 해제' &&
                        bossStat &&
                        Object.keys(bossStat).length > 0 && (
                          <span className={getStatClass(item.name, statName, cap)}>
                            {formatDiff(diff)}
                          </span>
                        )}
                    </div>
                  </td>
                );
              })}

              <td className={styles.button}>
                <button type="button" onClick={() => handleDelete(item.name)}>
                  <X size={16} stroke="#8b95a1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RaidLayout;

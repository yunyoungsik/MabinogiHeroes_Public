'use client';

import styles from './EnchantLayout.module.scss';
import { Info } from 'lucide-react';

const EnchantLayout = ({ data, enchantList }) => {
  return (
    <table className={styles.rankLayout}>
      <caption>인챈트 스크롤 거래소 거래 내역 및 시세</caption>

      <colgroup>
        <col width="10%" />
        <col width="10%" />
        <col width="10%" />
        <col className={styles.hideTablet} />
        <col width="10%" />
        <col width="10%" className={styles.hideMobile} />
        <col width="10%" className={styles.hideMobile} />
      </colgroup>

      {/* 테이블 헤더 */}
      <thead>
        <tr>
          <th scope="col">랭크</th>
          <th scope="col">인챈트</th>
          <th scope="col">접두/접미</th>
          <th scope="col" className={styles.hideTablet}>
            부위
          </th>
          <th scope="col">평균가</th>
          <th scope="col" className={styles.hideMobile}>
            최고가
          </th>
          <th scope="col" className={styles.hideMobile}>
            최저가
          </th>
        </tr>
      </thead>

      {/* 테이블 본문 */}
      <tbody aria-live="polite">
        {enchantList.map((item, index) => {
          // data에서 해당 enchantName에 맞는 항목 찾기
          const matchedData = data.find((d) => {
            return (
              d.item_option?.suffix_enchant_preset_1 === item.name ||
              d.item_option?.prefix_enchant_preset_1 === item.name
            );
          });

          return (
            <tr key={`${item.rank}-${item.name}-${index}`}>
              {/* 랭크 */}
              <td className={styles.ranking}>{item.rank}</td>

              {/* 인챈트 */}
              <td className={styles.name}>
                <div className={styles.nameItem}>
                  {item.name}
                  <Info size={12} stroke='#8b95a1' />
                </div>
                <div className={styles.ballon}>
                  <ul>
                    {item.stat.map((stat, index) => (
                      <li key={index}>{stat}</li>
                    ))}
                  </ul>
                </div>
              </td>

              {/* 접미/접두 */}
              <td className={styles.option}>{item.preset}</td>

              {/* 부위 */}
              <td className={`${styles.option} ${styles.hideTablet}`}>{item.slot.join(', ')}</td>

              {/* 평균가 */}
              <td className={styles.score}>{matchedData?.average_price.toLocaleString() || '-'}</td>

              {/* 최고가 */}
              <td className={`${styles.score} ${styles.hideMobile}`}>
                {matchedData?.max_price.toLocaleString() || '-'}
              </td>

              {/* 최저가 */}
              <td className={`${styles.score} ${styles.hideMobile}`}>
                {matchedData?.min_price.toLocaleString() || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default EnchantLayout;

import Link from 'next/link';
import Loading from '@/components/ui/Loading';
import styles from './RankLayout.module.scss';

const RankLayout = ({ loading, rankType, type, data }) => {
  return (
    <table className={styles.rankLayout}>
      <caption>
        {rankType === 0 ? '명예의전당' : '실시간랭킹'} - {type === 0 ? '공격력' : '마법공격력'}{' '}
        기준의 사용자 순위
      </caption>

      <colgroup>
        <col width="15%" />
        <col />
        {rankType === 0 && (
          <>
            <col width="30%" />
            <col width="30%" />
          </>
        )}
        <col width="15%" />
      </colgroup>

      {/* 테이블 헤더 */}
      <thead>
        <tr>
          <th scope="col">순위</th>
          <th scope="col">닉네임</th>
          {rankType === 0 && (
            <>
              <th scope="col">직업</th>
              <th scope="col">길드</th>
            </>
          )}
          <th scope="col">스코어</th>
        </tr>
      </thead>

      {/* 테이블 본문 */}
      <tbody aria-live="polite">
        {loading || !data || data.length === 0 ? (
          // 데이터 로딩 오류 시
          <tr className={styles.error}>
            <td colSpan={rankType === 0 ? 5 : 3}>
              <div className={styles.noResults} role="alert">
                <Loading />
                {/* <h2>MHON.KR</h2>
                <p>잠시 후 다시 시도해 주세요.</p>
                <span>현재 랭킹 정보를 불러오는 데 문제가 발생했습니다.</span>
                <span>지속적으로 문제가 발생하면 관리자에게 문의해 주세요.</span> */}
              </div>
            </td>
          </tr>
        ) : (
          // 데이터 로딩 성공 시
          data.map((user) => (
            <tr key={user.ranking}>
              {/* 순위 */}
              <td className={styles.ranking}>{user.ranking}</td>

              {/* 닉네임 */}
              <td className={styles.name}>
                <Link href={`/user/${user.character_name}`}>{user.character_name}</Link>
              </td>

              {rankType === 0 && (
                <>
                  {/* 직업 */}
                  <td className={styles.score}>{user.class}</td>

                  {/* 길드 */}
                  <td className={styles.score}>{user.guild}</td>
                </>
              )}

              {/* 스코어 */}
              <td className={styles.score}>{user.score}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default RankLayout;

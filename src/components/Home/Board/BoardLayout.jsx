import Loading from '@/components/ui/Loading';
import convertTime from '@/utils/convertTime';
import timeAgo from '@/utils/timeAgo';
import styles from './Board.module.scss';
import Link from 'next/link';

const BoardLayout = ({ loading, data }) => {
  const sliceData = data?.slice(0, 5);

  const renderTypeText = (type) => {
    switch (type) {
      case 'notice':
        return '공지';
      case 'patch':
        return '패치';
      case 'event':
        return '이벤트';
      default:
        return '공지';
    }
  };

  if (loading || !data || data.length === 0) {
    return (
      <div className={styles.boardLayout}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.boardLayout}>
      <ul>
        {sliceData?.map((item, index) => (
          <li key={index}>
            {item.type === 'notice' || item.type === 'patch' || item.type === 'event' ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <h2>{item.title}</h2>

                <div className={styles.infoBox}>
                  <p>{renderTypeText(item.type)}</p>
                  <span>·</span>
                  {item.type === 'event' ? (
                    <>
                      <p>{item.date_event_start || '시작 미정'}</p>
                      <span> ~ </span>
                      <p>{item.date_event_end || '종료 미정'}</p>
                    </>
                  ) : (
                    <p>{timeAgo(convertTime(item.date))}</p>
                  )}
                </div>
              </a>
            ) : (
              <Link href={`/notice/${item._id}`} target="_self">
                <h2>{item.title}</h2>

                <div className={styles.infoBox}>
                  <p>공지</p>
                  <span>·</span>
                  <p>{timeAgo(item.createdAt)}</p>
                  <span>·</span>
                  <p>조회수 {item.view}</p>
                </div>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardLayout;

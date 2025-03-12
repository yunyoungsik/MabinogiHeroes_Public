import { formatDate } from '@/utils/formatDate';
import styles from './Chart.module.scss';

const ChartHeader = ({ item }) => {
  if (!item || item.length < 2) return <h2 className={styles.logo}>MHON.KR</h2>;

  // 첫 번째와 마지막 평균가
  const firstPrice = item[0].average_price;
  const lastPrice = item[item.length - 1].average_price;

  // 변화량 및 변화율 계산
  const changeAmount = lastPrice - firstPrice;
  const changePercentage = Math.round((changeAmount / firstPrice) * 100 * 100) / 100;
  const isPositive = changeAmount >= 0;

  return (
    <div className={styles.chartHeader}>
      <h2>{item[0].item_name}</h2>

      <div className={styles.price}>
        {/* 마지막 평균가 (가격) */}
        <p aria-label={`현재 평균가: ${lastPrice.toLocaleString()} 골드`}>
          {lastPrice.toLocaleString()}
          <span>골드</span>
        </p>
      </div>

      {/* 변화율 (상승/하락) */}
      <div className={styles.changePercentage}>
        <p className={styles.date}>{formatDate(item[0].date_update)}보다</p>
        <p className={styles.change} style={{ color: isPositive ? 'red' : '#3182f6' }}>
          <span>
            {isPositive ? '+' : '-'}
            {Math.abs(changeAmount).toLocaleString()} 골드
          </span>
        </p>
        <p>
          <span
            style={{ color: isPositive ? 'red' : '#3182f6' }}
            aria-label={`변화율: ${isPositive ? '상승' : '하락'} ${Math.abs(changePercentage)}%`}
          >
            ({isPositive ? '+' : '-'}
            {Math.abs(changePercentage)}%)
          </span>
        </p>
      </div>
    </div>
  );
};

export default ChartHeader;

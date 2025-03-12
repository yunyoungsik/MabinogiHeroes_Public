import styles from './Chart.module.scss';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <h4>{payload[0].payload.name}</h4> {/* payload[0].payload.name으로 수정 */}
        <p>총 {payload[0].value.toLocaleString()}명</p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;

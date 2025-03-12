import styles from './Chart.module.scss';

const CustomToolTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  const filteredPayload = payload.filter((item) => item.name !== 'band');

  // 안전한 label 처리
  const formattedLabel = label
    ? new Date(label).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '날짜 정보 없음';

  // 색상 매핑
  const colorMap = {
    평균가: '#a234c7',
  };

  return (
    <div role="tooltip" aria-live="polite" aria-hidden={!active} className={styles.customToolTip}>
      <p className={styles.date}>
        <time dateTime={new Date(label).toISOString()}>{formattedLabel}</time>
      </p>
      <div className={styles.typeBox}>
        {filteredPayload.map((item) => (
          <p
            key={item.name}
            aria-label={`${item.name} 값: ${item.value.toLocaleString()} 골드`}
            className={styles.type}
          >
            <span className={styles.typeName} style={{ color: colorMap[item.name] || item.stroke }}>
              {item.name}
            </span>
            <span className={styles.price}>{item.value.toLocaleString()}골드</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default CustomToolTip;

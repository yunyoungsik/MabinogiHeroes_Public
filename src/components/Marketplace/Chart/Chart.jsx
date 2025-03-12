import React, { useMemo } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
// utils
import convertTime from '@/utils/convertTime';
import { formatNumber } from '@/utils/formatNumber';
// components
import CustomToolTip from './CustomToolTip';
import styles from './Chart.module.scss';

const Chart = ({ loading, error, item }) => {
  // ✅ 데이터 변환: a 배열을 min/max로 나눔
  const transformedData = useMemo(() => {
    if (!item || item.length === 0) return [];
    return item.map((entry) => ({
      ...entry,
      band: [entry.min_price, entry.max_price],
    }));
  }, [item]);

   // ✅ Y축 범위 계산
   const yAxisDomain = useMemo(() => {
    if (!item || item.length === 0) return [0, 0];
    const minPrice = Math.min(...item.map((entry) => entry.min_price));
    const maxPrice = Math.max(...item.map((entry) => entry.max_price));
    return [minPrice * 0.9, maxPrice * 1.1]; // -10%, +10% 적용
  }, [item]);

  if (error || !item || item.length === 0) {
    return (
      <div className={styles.error} role="alert">
        <h2>MHON.KR</h2>
        <p>해당하는 아이템의 검색 결과가 없습니다.</p>
        <span>최근 24시간 내 10건 이상의 거래가 발생한 아이템의 거래 기록이 조회됩니다.</span>
        <span>아이템 명을 다시 한번 확인하시고 재시도 해주세요.</span>
        <span>공백(띄어쓰기)까지 정확히 입력해 주세요.</span>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%" className={styles.chart}>
      <AreaChart data={transformedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        {/* 그라데이션 */}
        <defs>
          <linearGradient id="averagePriceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a234c7" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#edccf8" stopOpacity={0.2} />
          </linearGradient>
        </defs>

        {/* 그리드 */}
        <CartesianGrid stroke="#E5E8EB" />

        {/* X축: 날짜 */}
        <XAxis
          dataKey="date_update"
          axisLine={true}
          tick={{ fontSize: 12, dy: -1 }}
          ticks={item.filter((_, index) => index % 12 === 0).map((item) => item.date_update)}
          tickFormatter={(value) => {
            const koreaTime = convertTime(value);
            const date = new Date(koreaTime);
            return `${date.getMonth() + 1}월 ${date.getDate()}일`;
          }}
        />

        {/* Y축: 평균 가격 */}
        <YAxis
          // domain={([min, max]) => [min * 0.9, max * 1.1]}
          domain={yAxisDomain}
          dataKey="average_price"
          tickLine={false}
          axisLine={true}
          tick={{ fontSize: 12, dx: -1 }}
          tickFormatter={(value) => {
            return `${formatNumber(value)}`;
          }}
        />

        {/* 툴팁: 평균 가격과 날짜 */}
        <Tooltip content={<CustomToolTip />} />

        {/* 평균가 라인 */}
        <Area
          type="linear"
          dataKey="average_price"
          stroke="#a234c7"
          strokeWidth={3}
          fill="url(#averagePriceGradient)"
          fillOpacity="0.3"
          // dot={{ stroke: '#8884d8', strokeWidth: 2, r: 3 }}
          dot={false}
          name="평균가"
        />

        {/* 최고가 라인 */}
        <Area
          type="linear"
          dataKey="max_price"
          stroke="#f04452"
          strokeWidth={2}
          fill="transparent"
          dot={false}
          name="최고가"
        />

        {/* 최저가 라인 */}
        <Area
          type="linear"
          dataKey="min_price"
          stroke="#3182f6"
          strokeWidth={2}
          fill="transparent"
          dot={false}
          name="최저가"
        />

        {/* 볼리저 밴드 */}
        {/* <Area
          type="monotone"
          dataKey="band"
          stroke="none"
          fill="#ffc342"
          fillOpacity={0.3}
          connectNulls
          dot={false}
          activeDot={false}
        /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;

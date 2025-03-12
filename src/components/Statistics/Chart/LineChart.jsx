'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styles from './Chart.module.scss';
import CustomTooltip from './CustomTooltip';
import { useState } from 'react';

const LineChart = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // data를 클래스 카운트 형식으로 변환하고 정렬
  const categories = Object.entries(data)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className={styles.customChart}>
      <div className={styles.title}>
        <h2>길드 통계</h2>
        <span>랭커가 소속된 길드 {categories?.length}개 중 상위 10개 길드입니다.</span>
      </div>

      <div className={`${styles.chartContainer} ${styles.line}`}>
        <div className={styles.lineChart}>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart
              data={categories.slice(0, 10)}
              margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis
                dataKey="value"
                tick={{ fontSize: 12, dx: -1 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip cursor={{ fill: ' rgba(209, 214, 219, 0.5)' }} content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill="#a234c7"
                barSize={20}
                onMouseEnter={(data, index) => setHoveredIndex(index)} // 호버 시 인덱스 설정
                onMouseLeave={() => setHoveredIndex(null)} // 호버 해제 시 인덱스 초기화
              >
                {categories.slice(0, 10).map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      hoveredIndex === index
                        ? '#a234c7'
                        : hoveredIndex === null
                        ? '#a234c7'
                        : '#CCCCCC'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LineChart;

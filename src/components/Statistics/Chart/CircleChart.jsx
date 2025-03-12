'use client';

import React, { useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import styles from './Chart.module.scss';

const CircleChart = ({ type, total, data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const colors = [
    '#4B0E4B',
    '#580F58',
    '#6A0F6E',
    '#7A1E7A',
    '#8E2A8A',
    '#A239A3',
    '#B75BB5',
    '#C77BCE',
    '#A77BCA',
    '#9B59B6',
    '#D19CD9',
    '#C1A7D9',
    '#B57DCE',
    '#D9C2E4',
    '#D6C1E1',
    '#E0B3E2',
    '#E7D3E9',
  ];

  // data를 클래스 카운트 형식으로 변환하고 정렬
  const categories = Object.entries(data)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius + 10}
          outerRadius={outerRadius + 10} // 강조를 위해 outerRadius 크기 증가
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <div className={styles.customChart}>
      <div className={styles.title}>
        <h2>캐릭터 통계</h2>
        <span>
          {type === 0 ? '공격력' : '마법공격력'} 기준 랭커 총 {total}명의 통계 자료입니다.
        </span>
      </div>

      <div className={styles.chartContainer}>
        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={categories}
                innerRadius={50}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                onMouseEnter={(data, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
              >
                {categories.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    // fill={colors[index % colors.length]}
                    fill={
                      activeIndex === index
                        ? colors[index % colors.length]
                        : activeIndex === null
                        ? colors[index % colors.length]
                        : '#CCCCCC'
                    }
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className={styles.total}>
            <span>{categories?.length}개</span>
          </div>
        </div>

        <div className={styles.labelContainer}>
          <ul className={styles.label}>
            {categories.map((item, index) => (
              <li key={`legend-${index}`} className={styles.labelItem}>
                <span
                  className={styles.dot}
                  // style={{ backgroundColor: colors[index % colors.length] }}
                  style={{
                    backgroundColor:
                      activeIndex === index
                        ? colors[index % colors.length]
                        : activeIndex === null
                        ? colors[index % colors.length]
                        : '#CCCCCC',
                  }}
                />
                <span className={styles.name}>{item.name}</span>
                <span className={styles.value}>({item.value})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CircleChart;

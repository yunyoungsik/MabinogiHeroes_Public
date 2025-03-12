'use client';

import { useEffect, useState } from 'react';
import CircleChart from '../Chart/CircleChart';
import styles from './StatisticsLayout.module.scss';
import LineChart from '../Chart/LineChart';

const StatisticsLayout = ({ type, data }) => {
  const [classCount, setClassCount] = useState({});
  const [guildCount, setGuildCount] = useState({});

  useEffect(() => {
    const classCounter = {};
    const guildCounter = {};

    // hallOfHonors가 배열인지 확인 후 실행
    if (!Array.isArray(data) || data.length === 0) return;

    data.forEach(({ class: characterClass, guild }) => {
      // 클래스 집계
      classCounter[characterClass] = (classCounter[characterClass] || 0) + 1;
      // 길드 집계
      guildCounter[guild] = (guildCounter[guild] || 0) + 1;
    });

    setClassCount(classCounter);
    setGuildCount(guildCounter);
  }, [data]);

  return (
    <div className={styles.statisticsLayout}>
      <CircleChart type={type} total={data?.length} data={classCount} />
      <LineChart type={type} total={data?.length} data={guildCount} />
    </div>
  );
};

export default StatisticsLayout;

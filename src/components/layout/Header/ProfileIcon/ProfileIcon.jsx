'use client';

import React, { useEffect, useState } from 'react';
import styles from './ProfileIcon.module.scss';

const getRandomColor = () => {
  const colors = ['#FF6B6B', '#6BFFB3', '#6B8BFF', '#FFD36B', '#D36BFF'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ProfileIcon = ({ username, setToggleDropdown }) => {
  const [bgColor, setBgColor] = useState(getRandomColor());

  useEffect(() => {
    setBgColor(getRandomColor());
  }, [username]);

  return (
    <button
      type="button"
      className={styles.profileIcon}
      style={{ backgroundColor: bgColor }}
      onClick={() => setToggleDropdown((prev) => !prev)}
    >
      <span className={styles.initial}>{username?.charAt(0).toUpperCase()}</span>
      <div className={styles.shine} />
    </button>
  );
};

export default ProfileIcon;

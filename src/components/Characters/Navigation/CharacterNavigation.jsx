import React from 'react';
import UserInfo from '../Info/UserInfo';
import styles from './CharacterNavigation.module.scss';
import CharacterView from './CharacterView';

const categories = [
  { id: 'item', label: '장비' },
  { id: 'avatar', label: '아바타' },
  { id: 'skill', label: '스킬' },
  { id: 'stat', label: '능력치' },
];

const CharacterNavigation = ({cate, setCate}) => {
  return (
    <aside className={styles.aside}>
      <UserInfo />
      <nav className={styles.nav}>
        <ul>
        {categories.map(({ id, label }) => (
        <li key={id}>
          <button onClick={() => setCate(id)} className={`${styles.button} ${cate === id ? styles.active : ''}`}>
            {label}
          </button>
        </li>
      ))}
        </ul>
      </nav>
      <CharacterView />
    </aside>
  );
};

export default CharacterNavigation;

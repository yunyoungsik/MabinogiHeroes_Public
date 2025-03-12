import styles from './Category.module.scss';

const categories = [
  { id: 'mhNotice', label: '공지사항' },
  { id: 'notice', label: '본섭공지' },
  { id: 'patch', label: '패치노트' },
  { id: 'event', label: '이벤트' },
];

const Category = ({ cate, setCate }) => {
  return (
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
  );
};

export default Category;

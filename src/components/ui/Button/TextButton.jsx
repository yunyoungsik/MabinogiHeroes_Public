import styles from './Button.module.scss';

const TextButton = ({ active, text, handler }) => {
  return (
    <button
      type="button"
      className={`${styles.textButton} ${active ? styles.active : ''}`}
      onClick={handler}
    >
      <span>{text}</span>
    </button>
  );
};

export default TextButton;

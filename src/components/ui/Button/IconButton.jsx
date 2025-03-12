import styles from './Button.module.scss'

const IconButton = ({ handler, children}) => {
  return (
    <button
      type="button"
      onClick={handler}
      className={styles.iconButton}
    >
      {children}
    </button>
  );
};

export default IconButton
import styles from './Button.module.scss';

const LineButton = ({
  children,
  buttonType = 'button',
  disabled = false,
  handler,
  padding = 'var(--space-1) var(--space-2)',
}) => {
  return (
    <button
      type={buttonType}
      className={styles.lineButton}
      style={{ padding }}
      onClick={handler}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  );
};

export default LineButton;

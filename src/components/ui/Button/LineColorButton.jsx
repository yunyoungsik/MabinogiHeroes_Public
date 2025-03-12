import styles from './Button.module.scss';

const LineColorButton = ({
  children,
  buttonType = 'button',
  disabled = false,
  handler,
  padding = 'var(--space-1) var(--space-3)',
  backgroundColor = 'var(--white-900)',
  color = 'var(--grey-900)',
}) => {
  return (
    <button
      type={buttonType}
      className={styles.lineButton}
      style={{ padding, backgroundColor, color }}
      onClick={handler}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  );
};

export default LineColorButton;

import styles from './Button.module.scss';

const ColorButton = ({
  children,
  handler,
  padding = 'var(--space-1) var(--space-3)',
  backgroundColor = 'var(--white-900)',
  color = 'var(--grey-600)',
  hoverBgColor,
  hoverColor,
}) => {
  return (
    <button
      type="button"
      className={styles.colorButton}
      style={{
        padding,
        backgroundColor,
        color,
        '--hover-bg-color': hoverBgColor || backgroundColor,
        '--hover-color': hoverColor || color,
      }}
      onClick={handler}
    >
      <span>{children}</span>
    </button>
  );
};

export default ColorButton;

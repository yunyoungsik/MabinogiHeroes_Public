import Link from 'next/link';
import styles from './Button.module.scss';

const LinkColorButton = ({
  children,
  href = '/',
  padding = 'var(--space-1) var(--space-3)',
  backgroundColor = 'var(--white-900)',
  color = 'var(--purple-500)',
  hoverBgColor,
  hoverColor,
}) => {
  return (
    <Link
      href={href}
      className={styles.linkColorButton}
      style={{
        padding,
        backgroundColor,
        color,
        '--hover-bg-color': hoverBgColor || backgroundColor,
        '--hover-color': hoverColor || color,
      }}
    >
      <span>{children}</span>
    </Link>
  );
};

export default LinkColorButton;

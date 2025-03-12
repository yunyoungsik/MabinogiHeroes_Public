import Link from "next/link";
import styles from './Button.module.scss';

const LinkLineButton = ({
  children,
  href = '/',
  padding = 'var(--space-2) var(--space-4)',
  ...props
}) => {
  return (
    <Link
      href={href}
      className={styles.linkLineButton}
      style={{ padding }}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LinkLineButton;
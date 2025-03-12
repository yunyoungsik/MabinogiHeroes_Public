import { usePageViewStore } from '@/store/usePageViewStore';
import styles from './CharacterView.module.scss';

const CharacterView = () => {
  const { view } = usePageViewStore();
  return (
    <div className={styles.views}>
      <span>오늘 {view?.today}</span>
      <span>|</span>
      <span>전체 {view?.total}</span>
    </div>
  );
};

export default CharacterView;

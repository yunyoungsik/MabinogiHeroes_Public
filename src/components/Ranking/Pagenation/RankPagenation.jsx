import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './RankPagenation.module.scss';
import { useRankingStore } from '@/store/useRankingStore';

const RankPagenation = ({ localPage, setLocalPage, maxPage }) => {
  const {loading} = useRankingStore();

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    if (page >= 1 && page <= maxPage) {
      setLocalPage(page);
    }
  };

  // 페이지 목록 생성 (항상 5개 유지)
  const getPageNumbers = () => {
    if (maxPage <= 5) {
      return Array.from({ length: maxPage }, (_, i) => i + 1);
    }

    if (localPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (localPage >= maxPage - 2) {
      return [maxPage - 4, maxPage - 3, maxPage - 2, maxPage - 1, maxPage];
    }

    return [localPage - 2, localPage - 1, localPage, localPage + 1, localPage + 2];
  };

  const pageNumbers = getPageNumbers();

  if(loading) return null

  return (
    <nav className={styles.pagenation}>
      <ul>
        <li>
          <button
            type="button"
            onClick={() => handlePageChange(localPage - 1)}
            disabled={localPage === 1}
            aria-disabled={localPage === 1}
            aria-label="이전 페이지"
          >
            <ChevronLeft size={16} startOffset={2} />
          </button>
        </li>

        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              onClick={() => handlePageChange(page)}
              className={localPage === page ? styles.active : ''}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={() => handlePageChange(localPage + 1)}
            disabled={localPage >= maxPage}
            aria-disabled={localPage >= maxPage}
            aria-label="다음 페이지"
          >
            <ChevronRight size={16} startOffset={2} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default RankPagenation;

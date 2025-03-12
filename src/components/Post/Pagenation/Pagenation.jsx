'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './Pagenation.module.scss';

const PostPagenation = ({ page, count, postView }) => {
  const router = useRouter();
  const totalPage = Math.ceil(count / postView);

  const changePage = (newPage) => {
    router.push(`?page=${newPage}`);
  };

  return (
    <nav className={styles.nav}>
      <ul>
        {page > 1 && (
          <li onClick={() => changePage(page - 1)}>
            <span>&lt;</span>
          </li>
        )}

        {Array.from({ length: totalPage }, (_, i) => i + 1).map((pageNum) => (
          <li
            key={pageNum}
            className={pageNum === page ? `${styles.active}` : ''}
            onClick={() => changePage(pageNum)}
          >
            <span>{pageNum}</span>
          </li>
        ))}

        {page < totalPage && (
          <li
            onClick={() => changePage(page + 1)}
          >
            <span>&gt;</span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default PostPagenation;

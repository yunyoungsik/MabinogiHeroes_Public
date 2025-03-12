import React from 'react';

const Loading = () => {
  return (
    <div
      className="loading"
      role="status"
      aria-live="polite"
    >
      <span className="loader" aria-label="로딩 중..."></span>
    </div>
  );
};

export default Loading;

export const getRankBgClass = (ranking) => {
  switch (ranking) {
    case 1:
      return 'bg-rank1';
    case 2:
      return 'bg-rank2';
    case 3:
      return 'bg-rank3';
    default:
      return '';
  }
};

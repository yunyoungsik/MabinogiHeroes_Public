export const formatNumber = (num) => {
  if (num >= 1e20) return `${Math.round(num / 1e20).toLocaleString()}해`;
  if (num >= 1e16) return `${Math.round(num / 1e16).toLocaleString()}경`;
  if (num >= 1e12) return `${Math.round(num / 1e12).toLocaleString()}조`;
  if (num >= 1e8) return `${Math.round(num / 1e8).toLocaleString()}억`;
  if (num >= 1e4) return `${Math.round(num / 1e4).toLocaleString()}만`;
  return num.toLocaleString();
};
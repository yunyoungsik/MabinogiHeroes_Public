export const getStandardTime = () => {
  const now = new Date();
  const hours = now.getHours();

  return `${hours}:00`;
};
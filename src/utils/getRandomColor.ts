export const getRandomColor = () => {
  const hexString = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");
  return `#${hexString}`;
};

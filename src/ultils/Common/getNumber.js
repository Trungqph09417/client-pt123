export const getNumberPrice = (string) => {
  let arr = string.split(" ");
  return arr.map((item) => +item).filter((item) => !item === false);
};
export const getNumberArea = (string) => {
  let arr = string.split(" ");
  return arr.map((item) => +item.match(/\d+/)).filter((item) => item !== 0);
};

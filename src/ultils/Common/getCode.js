import { getNumberArea, getNumberPrice } from "./getNumber";

export const getCodePrice = (totals, min, max) => {
  return totals?.map((item) => {
    let arrMaxMin = getNumberPrice(item.value);

    return {
      ...item,
      min:
        arrMaxMin.length === 2
          ? arrMaxMin[0]
          : arrMaxMin[0] === min
          ? 0
          : arrMaxMin[0],

      max:
        arrMaxMin.length === 2
          ? arrMaxMin[1]
          : arrMaxMin[0] === max
          ? 999
          : arrMaxMin[0],
    };
  });
};

export const getCodeArea = (totals, min, max) => {
  return totals?.map((item) => {
    let arrMaxMin = getNumberArea(item.value);

    return {
      ...item,
      min:
        arrMaxMin.length === 2
          ? arrMaxMin[0]
          : arrMaxMin[0] === min
          ? 0
          : arrMaxMin[0],
      max:
        arrMaxMin.length === 2
          ? arrMaxMin[1]
          : arrMaxMin[0] === max
          ? 999
          : arrMaxMin[0],
    };
  });
};
export const getCodesPrice = (entry, prices, min, max) => {
  const arr = getCodePrice(prices, min, max);

  return arr.filter((item) => item.min <= entry && item.max > entry);
};

export const getCodesArea = (entry, areas, min, max) => {
  const arr = getCodeArea(areas, min, max);

  return arr.filter((item) => item.min <= entry && item.max > entry);
};

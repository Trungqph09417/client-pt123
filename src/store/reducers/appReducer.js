import actionTypes from "../actions/actionTypes";

const initState = {
  categories: [],
  prices: [],
  areas: [],
  provinces: [],
  msg: "",
};
const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORY:
      return {
        ...state,
        categories: action.categories || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_ALL_PRICE:
      return {
        ...state,
        prices: action.prices || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_ALL_AREA:
      return {
        ...state,
        areas: action.areas || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_ALL_PROVINCES:
      return {
        ...state,
        provinces: action.provinces || [],
        msg: action.msg || "",
      };

    default:
      return state;
  }
};
export default appReducer;

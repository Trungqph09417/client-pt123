import actionTypes from "./actionTypes";
import { apiGetCategory } from "../../services/category";
import { apiGetPrice } from "../../services/price";
import { apiGetArea } from "../../services/area";
import { apiGetProvince } from "../../services/province";
export const getCategory = () => async (dispatch) => {
  try {
    const response = await apiGetCategory();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_CATEGORY,
        categories: response.data.datas,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CATEGORY_FAIL,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CATEGORY_FAIL,
      categories: null,
      msg: error,
    });
  }
};

export const getPrice = () => async (dispatch) => {
  try {
    const response = await apiGetPrice();

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_ALL_PRICE,
        prices: response.data.datas.sort((a, b) => {
          return +a.order - +b.order;
        }),
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALL_PRICE_FAIL,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_PRICE_FAIL,
      prices: null,
      msg: error,
    });
  }
};

export const getArea = () => async (dispatch) => {
  try {
    const response = await apiGetArea();

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_ALL_AREA,
        areas: response.data.datas.sort((a, b) => {
          return +a.order - +b.order;
        }),
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALL_AREA_FAIL,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_AREA_FAIL,
      areas: null,
      msg: error,
    });
  }
};

export const getProvince = () => async (dispatch) => {
  try {
    const response = await apiGetProvince();

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_ALL_PROVINCES,
        provinces: response.data.datas,
        msg: "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALL_PROVINCES_FAIL,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_PROVINCES_FAIL,
      provinces: null,
      msg: error,
    });
  }
};

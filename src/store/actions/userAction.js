import actionTypes from "./actionTypes";
import { apiGetCurrent } from "../../services/user";
export const getCurrentUser = () => async (dispatch) => {
  try {
    const response = await apiGetCurrent();

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_CURRENT_USER,
        currentData: response.data.datas,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CURRENT_USER_FAIL,
        msg: response.data.msg,
      });
      dispatch({
        type: actionTypes.LOGOUT,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CURRENT_USER_FAIL,
      msg: error,
    });
    dispatch({
      type: actionTypes.LOGOUT,
    });
  }
};

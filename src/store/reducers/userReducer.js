import actionTypes from "../actions/actionTypes";

const initState = {
  currentData: {},
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_USER:
      return {
        ...state,
        currentData: action.currentData || {},
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        currentData: {},
      };
    default:
      return state;
  }
};
export default userReducer;

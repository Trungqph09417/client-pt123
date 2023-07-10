const actionTypes = {
  LOGIN: "LOGIN",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL: "REGISTER_FAIL",
  LOGOUT: "LOGOUT",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",

  GET_POSTS: "GET_POSTS",

  GET_POSTS_PAGE: "GET_POSTS_PAGE",
  GET_NEW_POSTS: "GET_NEW_POSTS",
  GET_NEW_POSTS_FAIL: "GET_NEW_POSTS_FAIL",
  GET_POST_LIMIT_MANAGE: "GET_POST_LIMIT_MANAGE",
  GET_POST_LIMIT_MANAGE_FAIL: "GET_POST_LIMIT_MANAGE_FAIL",

  GET_CATEGORY: "GET_CATEGORY",
  GET_CATEGORY_FAIL: "GET_CATEGORY_FAIL",

  GET_ALL_PRICE: "GET_ALL_PRICE",
  GET_ALL_PRICE_FAIL: "GET_ALL_PRICE_FAIL",

  GET_ALL_AREA: "GET_ALL_AREA",
  GET_ALL_AREA_FAIL: "GET_ALL_AREA_FAIL",

  GET_ALL_PROVINCES: "GET_ALL_PROVINCES",
  GET_ALL_PROVINCES_FAIL: "GET_ALL_PROVINCES_FAIL",
  // User
  GET_CURRENT_USER: "GET_CURRENT_USER",
  GET_CURRENT_USER_FAIL: "GET_CURRENT_USER_FAIL",

  // dataEdit
  DATA_POST_EDIT: "DATA_POST_EDIT",
  DATA_POST_EDIT_FAIL: "DATA_POST_EDIT_FAIL",
  // dataEdit
  RESET_POST_EDIT: "RESET_POST_EDIT",
  // data
  OUTSTANDING_POST: "OUTSTANDING_POST",
  OUTSTANDING_POST_FAIL: "OUTSTANDING_POST_FAIL",
};
export default actionTypes;

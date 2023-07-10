import actionTypes from "../actions/actionTypes";

const initState = {
  posts: [],
  msg: "",
  count: 0,
  newPosts: [],
  postOfCurrent: [],
  dataPostEdit: null,
  outstanding: [],
};
const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
    case actionTypes.GET_POSTS_PAGE:
      return {
        ...state,
        posts: action.posts || [],
        msg: action.msg || "",
        count: action.count || 0,
      };

    case actionTypes.GET_NEW_POSTS:
      return {
        ...state,
        msg: action.msg || "",
        newPosts: action.newPosts || [],
      };
    case actionTypes.GET_POST_LIMIT_MANAGE:
      return {
        ...state,
        msg: action.msg || "",
        postOfCurrent: action.posts || [],
      };
    case actionTypes.DATA_POST_EDIT:
      return {
        ...state,
        dataPostEdit: action.dataPostEdit || null,
      };
    case actionTypes.RESET_POST_EDIT:
      return {
        ...state,
        dataPostEdit: null,
      };
    case actionTypes.OUTSTANDING_POST:
      return {
        ...state,
        msg: action.msg || "",
        outstanding: action.outstanding || [],
      };

    default:
      return state;
  }
};
export default postReducer;

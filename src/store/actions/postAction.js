import actionTypes from "./actionTypes";
import {
  apiGetNewPost,
  apiGetPost,
  apiGetPostPageNate,
  apiGetPostPageNateManage,
} from "../../services/post";

export const getPosts = () => async (dispatch) => {
  try {
    const response = await apiGetPost();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS,
        posts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS,
      post: null,
    });
  }
};

export const getPostsPage = (query) => async (dispatch) => {
  try {
    const response = await apiGetPostPageNate(query);

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS_PAGE,
        posts: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS_PAGE,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS_PAGE,
      post: null,
    });
  }
};

export const getNewPosts = (query) => async (dispatch) => {
  try {
    const response = await apiGetNewPost();

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_NEW_POSTS,
        newPosts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_NEW_POSTS_FAIL,
        msg: response.data.msg,
        newPosts: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_NEW_POSTS_FAIL,
      newPosts: null,
    });
  }
};

export const getOutStanding = () => async (dispatch) => {
  try {
    const response = await apiGetPostPageNate({
      limitPost: 5,
      order: ["star", "DESC"],
    });

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.OUTSTANDING_POST,
        outstanding: response.data.response.rows,
      });
    } else {
      dispatch({
        type: actionTypes.OUTSTANDING_POST_FAIL,
        msg: response.data.msg,
        outstanding: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.OUTSTANDING_POST_FAIL,
      outstanding: null,
    });
  }
};

export const getPostPageManages = (query) => async (dispatch) => {
  try {
    const response = await apiGetPostPageNateManage();
    console.log(response);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POST_LIMIT_MANAGE,
        posts: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POST_LIMIT_MANAGE_FAIL,
        msg: response.data.msg,
        posts: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POST_LIMIT_MANAGE_FAIL,
      posts: null,
    });
  }
};

export const dataPostEdit = (dataPostEdit) => ({
  type: actionTypes.DATA_POST_EDIT,
  dataPostEdit,
});

export const resetDataPostEdit = () => ({
  type: actionTypes.RESET_POST_EDIT,
});

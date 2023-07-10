import axiosConfig from "../axiosConfig";
import axios from "axios";

export const apiGetPost = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/post/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetPostPageNate = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/post/limit`,
        params: query,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetNewPost = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/post/new-post`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUploadImages = (images) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        data: images,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCreateNewPost = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: `/api/v1/post/create-new`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPostPageNateManage = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/v1/post/limit-manage`,
        params: query,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUpdatePostPageNateManage = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: `/api/v1/post/update-post`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiDeletePostPageNateManage = (postId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "delete",
        url: `/api/v1/post/delete-post`,
        params: { postId },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

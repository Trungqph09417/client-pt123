import axiosConfig from "../axiosConfig";
import axiosDefault from "axios";
export const apiGetProvince = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/v1/province/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetPublicProvince = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "get",
        url: "https://vapi.vnappmob.com/api/province",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetPublicProvinceDistrict = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "get",
        url: `https://vapi.vnappmob.com/api/province/district/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

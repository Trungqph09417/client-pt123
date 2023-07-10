import { Buffer } from "buffer";
var buffer = require("buffer/").Buffer;
export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export const blobToBase64 = (blob) => {
  const data = blob?.data || "";
  // console.log(typeof `${blob?.data}`);
  return new Buffer(data, "base64").toString("binary");
};

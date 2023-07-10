import React, { useEffect, useState } from "react";
import { Overview, Address, Loading, Button } from "../../components";
import { AiFillCamera } from "react-icons/ai";
import {
  apiUpdatePostPageNateManage,
  apiUploadImages,
} from "../../services/post";
import icons from "../../ultils/icons";
import { getCodesArea, getCodesPrice } from "../../ultils/Common/getCode";
import { useDispatch, useSelector } from "react-redux";
import { apiCreateNewPost } from "../../services/post";
import Swal from "sweetalert2";
import validate from "../../ultils/Common/validateFields";
import * as actions from "../../store/actions";
import map from "../../assets/map.jpg";
import { attention } from "../../ultils/constain";

const { RiDeleteBin5Line } = icons;

const CreatePost = ({ isEdit }) => {
  const dispath = useDispatch();
  const { dataPostEdit } = useSelector((state) => state.post);

  const [payload, setpayload] = useState(() => {
    const initData = {
      categoryCode: dataPostEdit?.categoryCode || "",
      title: dataPostEdit?.title || "",
      priceNumber: dataPostEdit?.priceNumber * 1000000 || 0,
      areaNumber: dataPostEdit?.areaNumber || 0,
      images: dataPostEdit?.images?.image
        ? JSON.parse(dataPostEdit?.images?.image)
        : "",
      address: dataPostEdit?.address || "",
      priceCode: dataPostEdit?.priceCode || "",
      areaCode: dataPostEdit?.areaCode || "",
      description: dataPostEdit?.description
        ? JSON.parse([dataPostEdit?.description])
        : "",
      target: dataPostEdit?.overview?.target || "",
      province: dataPostEdit?.province || "",
    };
    return initData;
  });
  const [isLoading, setisLoading] = useState(false);
  const [validateFields, setvalidateFields] = useState([]);
  const [imagesPreview, setimagesPreview] = useState([]);
  const { prices, areas, categories } = useSelector((state) => state.app);
  const { currentData } = useSelector((state) => state.user);

  useEffect(() => {
    if (dataPostEdit) {
      let images = dataPostEdit?.images?.image
        ? JSON.parse(dataPostEdit?.images?.image)
        : "";
      images && setimagesPreview(images);
    }
  }, [dataPostEdit]);

  const handleFiles = async (e) => {
    e.stopPropagation();
    setisLoading(true);
    let images = [];
    let files = e.target.files;
    let formData = new FormData();
    for (let i of files) {
      formData.append("file", i);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_UPLOAD_ASSETS_NAME
      );
      const response = await apiUploadImages(formData);
      if (response.status === 200)
        images = [...images, response.data?.secure_url];
    }
    setisLoading(false);
    setimagesPreview((prev) => [...prev, ...images]);
    setpayload((prev) => ({
      ...prev,
      images: [...prev.images, ...images],
    }));
  };
  const handleDeleteImage = (image) => {
    setimagesPreview((prev) => prev?.filter((item) => item !== image));
    setpayload((prev) => ({
      ...prev,
      images: prev.images?.filter((item) => item !== image),
    }));
  };
  const handleSubmit = async () => {
    let priceCodeArr = getCodesPrice(
      +payload.priceNumber / Math.pow(10, 6),
      prices,
      1,
      15
    );
    let priceCode = priceCodeArr[0]?.code;
    // console.log(areas);
    let areaCodeArr = getCodesArea(+payload.areaNumber, areas, 20, 90);
    let areaCode = areaCodeArr[0]?.code;
    let description = [payload.description];
    let finalPayload = {
      ...payload,
      priceCode,
      areaCode,
      description,
      priceNumber: +payload.priceNumber / Math.pow(10, 6),
      userId: currentData?.id,
      target: payload.target,
      label: `${
        categories?.find((item) => item?.code === payload?.categoryCode)?.value
      } ${payload?.address?.split(",")[0]}`,
      category: `${
        categories?.find((item) => item?.code === payload?.categoryCode)?.value
      }`,
    };

    const result = validate(finalPayload, setvalidateFields);

    if (result === 0) {
      if (dataPostEdit) {
        finalPayload.postId = dataPostEdit?.id;
        finalPayload.overviewId = dataPostEdit?.overviewId;
        finalPayload.imagesId = dataPostEdit?.imagesId;
        finalPayload.attributesId = dataPostEdit?.attributesId;
        const response = await apiUpdatePostPageNateManage(finalPayload);
        if (response?.data.err === 0) {
          Swal.fire(
            "Thành công",
            "Đã chỉnh sửa bài đăng mới thành công",
            "success"
          ).then(() => {
            resetDataPost();
            dispath(actions.resetDataPostEdit());
          });
        } else {
          Swal.fire("Oops !", "Đã có lỗi", "error");
        }
      } else {
        const response = await apiCreateNewPost(finalPayload);
        if (response?.data.err === 0) {
          Swal.fire("Thành công", "Đã thêm bài đăng mới", "success").then(
            () => {
              setpayload({
                categoryCode: "",
                title: "",
                priceNumber: 0,
                areaNumber: 0,
                images: "",
                address: "",
                priceCode: "",
                areaCode: "",
                description: "",
                target: "",
                province: "",
              });
            }
          );
        } else {
          Swal.fire("Oops !", "Đã có lỗi", "error");
        }
      }
    }
  };
  const resetDataPost = () => {
    setpayload({
      categoryCode: "",
      title: "",
      priceNumber: 0,
      areaNumber: 0,
      images: "",
      address: "",
      priceCode: "",
      areaCode: "",
      description: "",
      target: "",
      province: "",
    });
  };
  return (
    <div className="px-6 ">
      <h1 className="text-3xl font-medium border-b border-gray-200 py-4">
        {isEdit ? "Chỉnh sửa thông tin đăng" : "Đăng tin mới"}
      </h1>
      <div className="flex gap-4 h-auto ">
        <div className="py-4 flex gap-8 flex-col flex-auto">
          <Address
            setvalidateFields={setvalidateFields}
            validateFields={validateFields}
            payload={payload}
            setpayload={setpayload}
          />
          <Overview
            setvalidateFields={setvalidateFields}
            validateFields={validateFields}
            payload={payload}
            setpayload={setpayload}
          />
          <div className="w-full mb-4">
            <h2 className="text-3xl font-medium">Hình ảnh</h2>
            <small>Cập nhập hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
            <div className="w-full">
              <label
                className="w-full border-2 my-4 h-[300px] flex flex-col gap-4 items-center justify-center border-gray-400 border-dashed rounded-md"
                htmlFor="file"
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  <span className="flex flex-col gap-4 items-center justify-center">
                    <AiFillCamera color="blue" size={50} />
                    Thêm ảnh
                  </span>
                )}
              </label>
              <input
                onChange={handleFiles}
                type="file"
                id="file"
                hidden
                multiple
              />
              <small className="text-red-500 block w-full">
                {validateFields?.some((item) => item.name === "images") &&
                  validateFields?.find((item) => item.name === "images")
                    ?.message}
              </small>
              <div>
                {" "}
                <h3 className="font-semibold py-4">Ảnh đã chọn</h3>
                <div className="flex gap-4 items-center flex-wrap object-cover">
                  {imagesPreview.map((item) => {
                    return (
                      <div key={item} className="relative w-1/3 h-[200px]">
                        <img
                          src={item}
                          alt="preview"
                          className=" w-full h-full object-cover rounded-md"
                        />
                        <span
                          title="Xóa"
                          onClick={() => handleDeleteImage(item)}
                          className="absolute top-0 right-0 p-2 m-2 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400"
                        >
                          <RiDeleteBin5Line size={24} color="blue" />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            text={isEdit ? "Cập nhập" : "Tạo mới"}
            bgColor="bg-green-600"
            textColor="text-white"
          />
          <div className="h-[500px]"></div>
        </div>

        <div className="w-[30%] flex-none">
          <div className="w-[500px] h-[300px]">
            <img src={map} alt="" />
          </div>
          <div className="mt-8 p-4 bg-orange-200">
            <h4 className="text-xl text-[#856404]">Lưu ý tin đăng</h4>
            <div>
              {attention?.map((item, index) => {
                return (
                  <li className="text-[#856404]" key={index}>
                    {item}
                  </li>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

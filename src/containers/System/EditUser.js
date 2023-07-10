import React, { useEffect, useState } from "react";
import { InputReadOnly, InputFormV2, Button } from "../../components/index";
import user from "../../assets/user.jpg";
import { useDispatch, useSelector } from "react-redux";
import { apiUploadImages } from "../../services/post";
import { apiUpdateUser } from "../../services/user";
import validate from "../../ultils/Common/validateFields";
import { fileToBase64, blobToBase64 } from "../../ultils/Common/toBase64";
import { getCurrentUser } from "../../store/actions";
import Swal from "sweetalert2";
const EditUser = () => {
  const [validateFields, setvalidateFields] = useState([]);
  const { currentData } = useSelector((state) => state.user);
  const dispath = useDispatch();
  const [payload, setpayload] = useState({
    name: "",
    zalo: "",
    phone: "",
    fbUrl: "",
    avatar: "",
  });
  useEffect(() => {
    setpayload({
      name: currentData?.name || "",
      zalo: currentData?.zalo || "",
      phone: currentData?.phone || "",
      fbUrl: currentData?.fbUrl || "",
      avatar: blobToBase64(currentData?.avatar) || "",
    });
  }, [currentData]);

  const handleUploadFile = async (e) => {
    // const image = e.target.files[0];
    // let formData = new FormData();
    // formData.append("file", image);
    // formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSETS_NAME);
    // const response = await apiUploadImages(formData);
    // if (response?.status === 200) {
    //   setpayload((prev) => ({
    //     ...prev,
    //     avatar: response?.data?.secure_url,
    //   }));
    // }
    const imageBase64 = await fileToBase64(e.target.files[0]);

    setpayload((prev) => ({
      ...prev,
      avatar: imageBase64,
    }));
  };
  const handleSubmit = async () => {
    const invalids = validate(payload, setvalidateFields);
    if (invalids === 0) {
      const response = await apiUpdateUser(payload);
      if (response?.data?.err === 0) {
        Swal.fire(
          "Done!",
          "Chỉnh sửa thông tin cá nhân thành công",
          "success"
        ).then(() => {
          dispath(getCurrentUser());
        });
      } else {
        Swal.fire("Opps!", "Chỉnh sửa không thành công", "error");
      }
    }
    // console.log(invalids);
    // console.log(payload);
  };
  return (
    <div className="flex flex-col items-center ">
      <h1
        className="text-3xl w-full
        items-start font-medium border-b border-gray-200 py-4"
      >
        Chỉnh sửa thông tin cá nhân
      </h1>
      <div className="w-3/5 py-9 flex flex-col gap-4 ">
        <InputReadOnly
          value={currentData?.id?.match(/\d/g)?.join("")?.slice(0, 6)}
          label="Mã thành viên"
          direction="flex-row"
        />
        <InputReadOnly
          value={payload.phone}
          label="Số điện thoại"
          direction="flex-row"
          editPhone
        />
        <InputFormV2
          setValue={setpayload}
          value={payload.name}
          validateFields={validateFields}
          setvalidateFields={setvalidateFields}
          label="Tên hiển thị"
          direction="flex-row"
          name="name"
        />

        <InputFormV2
          setValue={setpayload}
          value={payload.zalo}
          validateFields={validateFields}
          setvalidateFields={setvalidateFields}
          label="Số zalo"
          name="zalo"
          direction="flex-row"
        />
        <InputFormV2
          setValue={setpayload}
          value={payload.fbUrl}
          validateFields={validateFields}
          setvalidateFields={setvalidateFields}
          label="Facebook"
          name="fbUrl"
          direction="flex-row"
        />
        <div className="flex items-center">
          <label className="w-48 flex-none" htmlFor="password">
            Mật khẩu
          </label>
          <small className=" text-blue-500 cursor-pointer">Đổi mật khẩu</small>
        </div>
        <div className="flex mb-6 items-center">
          <label className="w-48 flex-none" htmlFor="avatar">
            Ảnh đại diện
          </label>
          <div>
            <img
              src={payload?.avatar || user}
              alt=""
              className="w-28 h-28 rounded-full object-cover"
            />
            {validateFields?.some((item) => item.name === "avatar") && (
              <small className="text-red-500 block w-full">
                {
                  validateFields?.find((item) => item.name === "avatar")
                    ?.message
                }
              </small>
            )}
            <input
              onChange={handleUploadFile}
              className="my-4"
              type="file"
              name=""
              id="avatar"
            />
          </div>
        </div>
        <Button
          text="Lưu & cập nhập"
          bgColor="bg-blue-500"
          textColor="text-white "
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditUser;

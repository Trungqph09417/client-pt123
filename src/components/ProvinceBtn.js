import React, { memo } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { path } from "../ultils/constain";

const ProvinceBtn = ({ name, image, provinceCode }) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    const titleText = `Cho thuê ${name}, Phòng trọ giá rẻ`;
    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams({ provinceCode }).toString(),
      },
      { state: { titleText } }
    );
  };
  return (
    <div
      onClick={handleOnClick}
      className=" shadow-md rounded-bl-md rounded-br-md cursor-pointer text-blue-700 hover:text-orange-600 "
    >
      <img
        src={image}
        alt={name}
        className="w-[190px] h-[110px] object-cover rounded-tl-sm rounded-tr-sm"
      />
      {/* alt khi ảnh lỗi thì src hiện
        - object-cover ==> ảnh bằng với kích thước
        - object-contain ==> quan tâm nội dung img
      */}
      <div className="font-medium p-2  text-center ">{name}</div>
    </div>
  );
};

export default memo(ProvinceBtn);

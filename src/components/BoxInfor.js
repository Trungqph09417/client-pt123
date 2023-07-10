import React, { memo, useEffect, useState } from "react";
import user from "../assets/user.jpg";
import { BsDot } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
const BoxInfor = ({ userData }) => {
  const { SiZalo } = icons;
  return (
    <div className="w-full bg-[#febb02]">
      <div className="w-full flex flex-col items-center p-[15px]">
        <img src={user} className="w-16 h-16 rounded-full  " alt="" />
        <span className="text-lg font-bold">{userData?.name}</span>
        <span className="flex items-center">
          <BsDot size={40} color="#16c784" />
          <span> Đang hoạt động</span>
        </span>
        <Link
          to={`tel:${userData?.phone}`}
          className="py-[10px] w-full bg-[#16c784] flex justify-center items-center gap-2 text-white font-bold text-xl"
        >
          <AiFillPhone size={24} />
          {userData?.phone}
        </Link>
        <a
          className="mt-4 rounded-md py-[10px] w-full bg-white flex justify-center items-center gap-2 text-white font-bold text-xl"
          href={`https://zalo.me/${userData?.zalo}`}
        >
          <SiZalo size={40} color="blue" />
        </a>
      </div>
    </div>
  );
};

export default memo(BoxInfor);

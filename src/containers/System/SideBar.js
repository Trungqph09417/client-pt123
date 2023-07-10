import React from "react";
import user from "../../assets/user.jpg";
import { useSelector, useDispatch } from "react-redux";
import menuSideBar from "../../ultils/menuSideBar";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions";
import icons from "../../ultils/icons";
import { blobToBase64 } from "../../ultils/Common/toBase64";
const activeStyle =
  "hover:bg-gray-200  py-2 flex items-center gap-2 rounded-md font-bold bg-gray-300";
const notactiveStyle =
  "hover:bg-gray-200 gap-2 rounded-md py-2 flex items-center cursor-pointer";
const { FiLogIn } = icons;
const SideBar = () => {
  const dispatch = useDispatch();
  const { currentData } = useSelector((state) => state.user);
  return (
    <div className="w-[256px] flex-none p-4 flex flex-col gap-6">
      <div className=" flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <img
            src={blobToBase64(currentData?.avatar) || user}
            alt="avatar"
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          <div className=" flex flex-col justify-center">
            <span className="font-semibold">{currentData?.name}</span>
            <small>{currentData?.phone}</small>
          </div>
        </div>
        <span>
          Mã thành viên:
          <small className=" ml-1 font-semibold">{`${currentData?.id
            ?.match(/\d/g)
            ?.join("")
            ?.slice(0, 6)}`}</small>
        </span>
      </div>
      <div>
        {menuSideBar.map((item) => {
          return (
            <NavLink
              className={({ isActive }) =>
                isActive ? activeStyle : notactiveStyle
              }
              key={item?.id}
              to={item?.path}
            >
              {item?.icon}
              {item?.text}
            </NavLink>
          );
        })}
        <span
          onClick={() => dispatch(actions.logout())}
          className={notactiveStyle}
        >
          <FiLogIn />
          Thoát
        </span>
      </div>
    </div>
  );
};

export default SideBar;

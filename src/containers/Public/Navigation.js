import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { apiGetCategory } from "../../services/category";
import { formatVietnam } from "../../ultils/Common/formatVietnam";
import { useSelector, useDispatch } from "react-redux";
import { getCategory } from "../../store/actions/appAction";

const notActive =
  "hover:bg-secondary2 px-4 h-full flex items-center bg-secondary1";
const active =
  "hover:bg-secondary2 px-4 h-full flex items-center bg-secondary2";

const Navigation = ({ isManageUser }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <div
      className={`w-screen flex ${
        isManageUser ? "justify-start" : " justify-center"
      } items-center  h-[40px] bg-secondary1 text-white`}
    >
      <div className="w-3/5 flex h-[40px] items-center gap-3 text-sm font-medium">
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? active : notActive)}
        >
          Trang chủ
        </NavLink>

        {categories?.length > 0 &&
          categories?.map((item, index) => {
            return (
              <div
                key={item.code}
                className="h-full flex justify-center items-center"
              >
                <NavLink
                  to={`/${formatVietnam(item.value)}`}
                  className={({ isActive }) => (isActive ? active : notActive)}
                >
                  {item.value}
                </NavLink>
              </div>
            );
          })}
        <NavLink
          to={"/lien-he"}
          className={({ isActive }) => (isActive ? active : notActive)}
        >
          Liên hệ
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;

import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { Button } from "../../components";
import icons from "../../ultils/icons";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { path } from "../../ultils/constain";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import menuManage from "../../ultils/menuManage";
import User from "../../components/User";
const { AiOutlinePlusCircle, AiOutlineLogout, HiOutlineChevronDown } = icons;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const listRef = useRef();
  const [isShowMenu, setisShowMenu] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { currentData } = useSelector((state) => state.user);

  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);

  useEffect(() => {
    listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchParams.get("page")]);

  return (
    <div ref={listRef} className="w-3/5">
      <div className="max-w-1100 flex items-center justify-between ">
        <Link to={"/"}>
          <img
            src={logo}
            alt=""
            className="w-[240px] h-[70px] object-contain"
          />
        </Link>
        <div className="flex items-center gap-1">
          {!isLoggedIn && (
            <>
              <small>phongtro123 xin chào !</small>
              <Button
                text={"Đăng nhập"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(false)}
              />
              <Button
                text={"Đăng ký"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(true)}
              />
            </>
          )}
          {isLoggedIn && (
            <div className="h-full flex items-center gap-3 relative z-10">
              <User />
              <Button
                text={"Quản lý tài khoản"}
                textColor="text-white"
                bgColor="bg-blue-700"
                className="px-4"
                onClick={() => setisShowMenu((prev) => !prev)}
                IcBsPlus={HiOutlineChevronDown}
              />
              {isShowMenu && (
                <div className="absolute min-w-200 bg-white shadow-md top-full rounded-md p-4 right-0 flex flex-col ">
                  {menuManage.map((item) => {
                    return (
                      <Link
                        className="hover:text-orange-500 text-blue-600 border-b border-gray-200 py-2 flex items-center gap-2"
                        key={item?.id}
                        to={item?.path}
                      >
                        {item?.icon}
                        {item?.text}
                      </Link>
                    );
                  })}
                  <span
                    className="flex gap-2 items-center cursor-pointer hover:text-orange-500  text-blue-600  border-gray-200 py-2"
                    onClick={() => {
                      setisShowMenu(false);
                      dispatch(actions.logout());
                    }}
                  >
                    <AiOutlineLogout />
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          )}

          <Button
            text={"Đăng tin mới"}
            textColor="text-white"
            bgColor="bg-secondary2"
            IcBsPlus={AiOutlinePlusCircle}
            onClick={() => navigate("/he-thong/tao-moi-bai-dang")}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;

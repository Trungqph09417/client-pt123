import React from "react";
import { useSelector } from "react-redux";
import user from "../assets/user.jpg";

import { blobToBase64 } from "../ultils/Common/toBase64";

const User = () => {
  const { currentData } = useSelector((state) => state.user);
  return (
    <>
      {currentData && Object.keys(currentData).length > 0 && (
        <div className="flex items-center gap-3">
          <img
            src={blobToBase64(currentData?.avatar) || user}
            alt="avatar"
            className="h-[40px] w-[40px] rounded-full  object-cover border-2 border-white shadow-sm"
          />
          <span className="flex flex-col">
            <span>
              Xin chào, <span className="font-bold">{currentData?.name}</span>{" "}
            </span>
            <span>
              Mã tài khoản:{" "}
              <span className="font-bold ">
                {`${currentData?.id?.match(/\d/g)?.join("")?.slice(0, 6)}`}
              </span>
            </span>
          </span>
        </div>
      )}
    </>
  );
};

export default User;

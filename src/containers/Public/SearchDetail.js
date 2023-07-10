import React, { useEffect, useState } from "react";
import Province from "../../components/Province";
import List from "./List";
import Pagination from "./Pagination";
import { ItemsSideBar, RelatedPost } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const SearchDetail = () => {
  const { categories, prices, areas } = useSelector((state) => state.app);
  const [categoryCode, setcategoryCode] = useState("none");
  const location = useLocation();

  return (
    <div>
      <div className="w-[1227px] flex flex-col gap-3">
        <div>
          <h1 className="text-[28px] font-bold">
            {location.state?.titleText
              ? location.state?.titleText
              : "Kết quả không tìm thấy"}
          </h1>
          <p className="text-base text-gray-700">{`${
            location?.state?.titleText || ""
          } phòng mới xây, chính chủ gần chợ, trường học, siêu thị, cửa hàng tiện lợi, khu an ninh.`}</p>
        </div>
        <div className="w-full flex gap-4">
          <div className="w-[70%]">
            <List />
            <Pagination />
          </div>
          <div className="w-[30%]  flex flex-col gap-4 justify-star items-center">
            <ItemsSideBar
              title={"Xem theo giá"}
              content={prices}
              isdouble={true}
              type="priceCode"
            />
            <ItemsSideBar
              title={"Xem theo diện tích"}
              type="areaCode"
              content={areas}
              isdouble={true}
            />
            <RelatedPost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDetail;

import React, { useEffect } from "react";
import { text } from "../../ultils/constain";
import Province from "../../components/Province";
import List from "./List";
import Pagination from "./Pagination";
import { useParams, useSearchParams } from "react-router-dom";
import { ItemsSideBar, RelatedPost } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
const HomePage = () => {
  const { categories, prices, areas } = useSelector((state) => state.app);

  return (
    <div className="w-[1227px] flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">{text.HOME_TITLE}</h1>
        <p className="text-base text-gray-700">{text.HOME_DESC}</p>
      </div>

      <div>
        <Province />
      </div>
      <div className="w-full flex gap-4">
        <div className="w-[70%]">
          <List />
          <Pagination />
        </div>
        <div className="w-[30%]  flex flex-col gap-4 justify-star items-center">
          <ItemsSideBar title={"Danh sách cho thuê"} content={categories} />
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
  );
};

export default HomePage;

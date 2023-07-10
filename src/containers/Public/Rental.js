import React, { useEffect, useState } from "react";
import { text } from "../../ultils/constain";
import Province from "../../components/Province";
import List from "./List";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom";
import { ItemsSideBar, RelatedPost } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { formatVietnam } from "../../ultils/Common/formatVietnam";
import * as actions from "../../store/actions";
const Rental = () => {
  const { categories, prices, areas } = useSelector((state) => state.app);
  const [categoryCode, setcategoryCode] = useState("none");
  const [category, setcategory] = useState({});
  const location = useLocation();

  useEffect(() => {
    const category = categories.find(
      (item) => `/${formatVietnam(item.value)}` === location.pathname
    );
    setcategory(category);

    if (category) {
      setcategoryCode(category.code);
    }
  }, [location]);

  return (
    <div>
      <div className="w-[1227px] flex flex-col gap-3">
        <div>
          <h1 className="text-[28px] font-bold">{category?.header}</h1>
          <p className="text-base text-gray-700">{category?.subheader}</p>
        </div>

        <div>
          <Province />
        </div>
        <div className="w-full flex gap-4">
          <div className="w-[70%]">
            <List categoryCode={categoryCode} />
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

export default Rental;

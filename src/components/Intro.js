import React, { memo } from "react";
import { text } from "../ultils/Common/dataIntro";
import Items from "./Items";
import icons from "../ultils/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatVietnam } from "../ultils/Common/formatVietnam";
const Intro = () => {
  const { AiFillStar } = icons;
  const { categories } = useSelector((state) => state.app);
  const star = [1, 2, 3, 4, 5];
  return (
    <div className="border w-3/5 bg-white rounded-sm shadow-sm p-4 flex flex-col justify-center items-center">
      <h3 className="font-semibold text-lg ">{text.title}</h3>
      <p className="text-gray-700 text-center my-4">
        {text.description}
        <span className="text-link">
          {categories.length > 0 &&
            categories.map((i, index) => {
              return (
                <Link
                  to={`${formatVietnam(i.value)}`}
                  key={i.code}
                  className="text-blue-600 font-medium hover:text-orange-600"
                >
                  {`${i.value.toLowerCase()}, `}
                </Link>
              );
            })}
        </span>
        {text.description2}
      </p>
      <div className="flex items-center  justify-around w-full">
        {text.statistic.map((i, index) => {
          return (
            <div className=" flex flex-col " key={index}>
              <h4 className="font-semibold text-lg">{i.value}</h4>
              <p className="text-gray-600">{i.name}</p>
            </div>
          );
        })}
      </div>

      <h3 className="font-semibold text-lg p-4 ">{text.price}</h3>
      <div className="flex justify-center">
        {star.map((i, index) => {
          return (
            <AiFillStar
              className="star-items mr-2  "
              color="yellow"
              fontSize="1.5em"
            />
          );
        })}
      </div>
      <p className="text-gray-700 text-center my-4 italic">
        {text.description}
      </p>
      <div className="text-gray-700 text-center my-4">{text.author}</div>
      <div className="font-semibold text-lg">{text.question}</div>
      <p className="text-gray-700 text-center my-4">{text.anwser}</p>
      <button className="bg-[#f73859] px-4 py-2 text-white hover:underline border rounded-md cursor-pointer">
        Đăng tin ngay
      </button>
      <div className="h-[48px]"></div>
    </div>
  );
};

export default memo(Intro);

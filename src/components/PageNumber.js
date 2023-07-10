import React, { memo, useEffect } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";

const active =
  "w-[48px] h-[46px] flex items-center justify-center bg-red-500 text-white rounded-md ";
const notActive =
  "w-[48px] h-[46px] flex items-center justify-center  bg-white hover:bg-gray-300 rounded-md  ";

const PageNumber = ({ text, currentPage, setcurrentPage, icon }) => {
  const navigate = useNavigate();
  const [paramSeach] = useSearchParams();
  const location = useLocation();
  let entries = paramSeach.entries();

  const append = (entries) => {
    let params = [];
    paramSeach.append("page", +text);
    for (let entry of entries) {
      params.push(entry);
    }
    let searchParamObject = {};
    params?.forEach((i) => {
      if (
        Object.keys(searchParamObject)?.some(
          (item) => item === i[0] && item !== "page"
        )
      ) {
        searchParamObject[i[0]] = [...searchParamObject[i[0]], i[1]];
      } else {
        searchParamObject = { ...searchParamObject, [i[0]]: [i[1]] };
      }
    });

    return searchParamObject;
  };
  // console.log(console.log("a param pageNumber", append(entries)));
  const handleChangePage = () => {
    if (!(text === "...")) {
      setcurrentPage(+text);
      navigate({
        pathname: location.pathname,
        search: createSearchParams(append(entries)).toString(),
      });
    }
  };
  return (
    <div
      className={
        +text === +currentPage
          ? `${active} ${text === "..." ? "cursor-text" : "cursor-pointer"}`
          : `${notActive} ${text === "..." ? "cursor-text" : "cursor-pointer"}`
      }
      onClick={handleChangePage}
    >
      {icon || text}
    </div>
  );
};

export default memo(PageNumber);

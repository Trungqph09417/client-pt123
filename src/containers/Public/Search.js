import React, { useCallback, useEffect, useMemo, useState } from "react";
import SearchItem from "../../components/SearchItem";
import icons from "../../ultils/icons";
import { Modal } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import {
  Navigate,
  useNavigate,
  createSearchParams,
  useLocation,
} from "react-router-dom";
import { path } from "../../ultils/constain";
import {
  getCodePrice,
  getCodeArea,
  getCodesPrice,
  getCodesArea,
} from "../../ultils/Common/getCode";
const {
  BiMap,
  TbReportMoney,
  AiOutlineBorderlessTable,
  IoIosArrowForward,
  SlCrop,
  BsHouseDoor,
  CiSearch,
} = icons;

const Search = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isShowModal, setisShowModal] = useState(false);
  const [name, setname] = useState("");
  const [content, setcontent] = useState([]);
  const [queries, setqueries] = useState({});
  const [arrMinMax, setarrMinMax] = useState({});
  const [defaultText, setdefaultText] = useState("");
  const { provinces, areas, prices, categories } = useSelector(
    (state) => state.app
  );
  useEffect(() => {
    if (!location.pathname.includes(path.SEARCH)) {
      setarrMinMax({});
      setqueries({});
    }
  }, [location]);

  const handleShowModal = (content, name, defaultText) => {
    setcontent(content);
    setname(name);
    setdefaultText(defaultText);
    setisShowModal(true);
  };
  const handleSubmit = useCallback(
    (e, query, arrMaxMin) => {
      e.stopPropagation();
      setqueries((prev) => ({ ...prev, ...query }));
      setisShowModal(false);
      arrMaxMin && setarrMinMax((prev) => ({ ...prev, ...arrMaxMin }));
    },
    [isShowModal, queries]
  );
  const handleSearch = () => {
    const queryCodes = Object.entries(queries)
      .filter((item) => item[0].includes("Number") || item[0].includes("Code"))
      .filter((i) => i[1]);

    let queryCodeObj = {};
    queryCodes.forEach((item) => {
      queryCodeObj[item[0]] = item[1];
    });
    const queryText = Object.entries(queries).filter(
      (item) => !item[0].includes("Code") || !item[0].includes("Number")
    );
    let titleSearch = {};
    queryText.forEach((i) => {
      titleSearch[i[0]] = i[1];
    });

    let titleText = `${
      titleSearch.category ? titleSearch.category : "Cho thuê tất cả"
    } ${titleSearch?.province ? titleSearch.province : ""} giá ${
      titleSearch.price ? titleSearch.price : ""
    } , diện tích ${titleSearch.area ? titleSearch.area : ""}  `;

    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams(queryCodeObj).toString(),
      },
      { state: { titleText } }
    );
  };
  return (
    <>
      <div className="w-3/5 mt-3 p-[10px] bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center gap-4 justify-around ">
        <span
          onClick={() => handleShowModal(categories, "category", "Tìm tất cả")}
          className="cursor-pointer flex-1"
        >
          <SearchItem
            text={queries.category}
            defaultText={"Tìm tất cả"}
            fontWeight
            IconBefore={<BsHouseDoor />}
            IconAfter={<IoIosArrowForward />}
          />
        </span>
        <span
          onClick={() => handleShowModal(provinces, "province", "Toàn quốc")}
          className="cursor-pointer flex-1"
        >
          <SearchItem
            IconBefore={<BiMap />}
            text={queries.province}
            defaultText={"Toàn quốc"}
            IconAfter={<IoIosArrowForward />}
          />
        </span>
        <span
          onClick={() => handleShowModal(prices, "price", "Chọn giá")}
          className="cursor-pointer flex-1"
        >
          <SearchItem
            IconBefore={<TbReportMoney />}
            text={queries.price}
            defaultText={"Chọn giá"}
            IconAfter={<IoIosArrowForward />}
          />
        </span>
        <span
          onClick={() => handleShowModal(areas, "area", "Chọn diện tích")}
          className="cursor-pointer flex-1"
        >
          <SearchItem
            IconBefore={<SlCrop />}
            text={queries.area}
            defaultText={"Chọn diện tích"}
            IconAfter={<IoIosArrowForward />}
          />
        </span>
        <button
          type="button"
          className="outline-none py-2 px-4 flex-1 bg-secondary1 rounded-lg flex items-center gap-1 text-white font-medium "
          onClick={handleSearch}
        >
          {<CiSearch />} Tìm kiếm
        </button>
      </div>
      {isShowModal && (
        <Modal
          content={content}
          handleSubmit={handleSubmit}
          queries={queries}
          name={name}
          arrMinMax={arrMinMax}
          defaultText={defaultText}
          setisShowModal={setisShowModal}
        />
      )}
    </>
  );
};

export default Search;

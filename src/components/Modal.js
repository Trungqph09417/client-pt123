import React, { memo, useEffect, useState } from "react";
import icons from "../ultils/icons";
import { getNumberPrice, getNumberArea } from "../ultils/Common/getNumber";
import {
  getCodePrice,
  getCodesArea,
  getCodesPrice,
} from "../ultils/Common/getCode";

const Modal = ({
  setisShowModal,
  content,
  name,
  handleSubmit,
  queries,
  arrMinMax,
  defaultText,
}) => {
  const { GrLinkPrevious } = icons;

  const [persent1, setpersent1] = useState(
    name === "price" && arrMinMax?.priceArr
      ? arrMinMax?.priceArr[0]
      : name === "area" && arrMinMax?.areaArr
      ? arrMinMax?.areaArr[0]
      : 0
    // 0
  );
  const [persent2, setpersent2] = useState(
    name === "price" && arrMinMax?.priceArr
      ? arrMinMax?.priceArr[1]
      : name === "area" && arrMinMax?.areaArr
      ? arrMinMax?.areaArr[1]
      : 100
    // 100
  );
  const [activeEl, setactiveEl] = useState("");
  useEffect(() => {
    const activeTrackEl = document.getElementById("track-active");
    if (activeTrackEl) {
      if (persent1 <= persent2) {
        activeTrackEl.style.left = `${persent1}%`;
        activeTrackEl.style.right = `${100 - +persent2}%`;
      } else {
        activeTrackEl.style.left = `${persent2}%`;
        activeTrackEl.style.right = `${100 - +persent1}%`;
      }
    }
  }, [persent1, persent2]);
  const handleOnclickTrack = (e, value) => {
    e.stopPropagation();
    const stackEl = document.getElementById("track");
    const stackReact = stackEl.getBoundingClientRect();
    // console.log("log value e ....", e.clientX);

    let percent = value
      ? value
      : Math.round(((e.clientX - stackReact.left) * 100) / stackReact.width, 0);
    if (Math.abs(percent - persent1) <= Math.abs(percent - persent2)) {
      setpersent1(percent);
    } else {
      setpersent2(percent);
    }
  };

  const convert100toTarget = (percent) => {
    return name === "price"
      ? (Math.ceil(Math.round(percent * 1.5) / 5) * 5) / 10
      : name === "area"
      ? Math.ceil(Math.round(percent * 0.9) / 5) * 5
      : 0;
    //1.5 0.4 1 5 0.5
    // 20
  };
  const convertTo100 = (percent) => {
    let target = name === "price" ? 15 : name === "area" ? 90 : 1;
    return Math.floor((percent / target) * 100);
  };

  const handleActive = (code, value) => {
    setactiveEl(code);
    let arrMaxMin =
      name === "price"
        ? getNumberPrice(value)
        : name === "area"
        ? getNumberArea(value)
        : "";
    if (arrMaxMin.length === 1) {
      if (arrMaxMin[0] === 1) {
        setpersent1(0);
        setpersent2(convertTo100(1));
      }
      if (arrMaxMin[0] === 20) {
        setpersent1(0);
        setpersent2(convertTo100(20));
      }
      if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
        setpersent1(100);
        setpersent2(100);
      }
    }
    if (arrMaxMin.length === 2) {
      setpersent1(convertTo100(arrMaxMin[0]));
      setpersent2(convertTo100(arrMaxMin[1]));
    }
  };
  const handleBeforSubmit = (e) => {
    let min = persent1 <= persent2 ? persent1 : persent2;
    let max = persent1 <= persent2 ? persent2 : persent1;
    let arrMinMax =
      persent1 === persent2 && persent1 === 100
        ? [convert100toTarget(min), 9999]
        : [convert100toTarget(min), convert100toTarget(max)];

    // const gaps =
    //   name === "price"
    //     ? getCodesPrice(arrMinMax, content)
    //     : name === "area"
    //     ? getCodesArea(arrMinMax, content)
    //     : [];

    handleSubmit(
      e,
      {
        [`${name}Number`]: arrMinMax,
        [name]: `Từ ${convert100toTarget(min)} ${
          persent1 === persent2 && persent1 === 100
            ? ""
            : `-${convert100toTarget(max)}`
        }  ${name === "price" ? "triệu" : "m2"} ${
          persent1 === persent2 && persent1 === 100 ? "Trở lên " : ""
        } `,
      },
      {
        [`${name}Arr`]: [min, max],
      }
    );
  };

  return (
    <div
      onClick={() => {
        setisShowModal(false);
      }}
      className="fixed top-0 bottom-0 left-0 right-0 bg-overlay-70 z-10 flex justify-center items-center "
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setisShowModal(true);
        }}
        className="w-2/5 h-[500px] bg-white rounded-md relative"
      >
        <div className="h-[45px] px-4 flex items-center border-b border-gray-100">
          <span>
            <GrLinkPrevious
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setisShowModal(false);
              }}
              size={24}
            />
          </span>
          <header className="w-[90%] text-center">Chọn tỉnh thành</header>
        </div>
        {(name === "category" || name === "province") && (
          <div className="p-4 flex flex-col ">
            <span className="flex py-2 gap-2 items-center border-b border-gray-200">
              <input
                type="radio"
                name={name}
                id="default"
                value={defaultText || ""}
                checked={!queries[`${name}Code`] ? true : false}
                onChange={(e) =>
                  handleSubmit(e, {
                    [name]: defaultText,
                    [`${name}Code`]: null,
                  })
                }
              />
              <label htmlFor="default">{defaultText}</label>
            </span>
            {content?.map((item) => {
              return (
                <span
                  key={item.code}
                  className="flex py-2 gap-2 items-center border-b border-gray-200"
                >
                  <input
                    type="radio"
                    name={name}
                    id={item.code}
                    value={item.code}
                    checked={
                      item.code === queries[`${name}Code`] ? true : false
                    }
                    onChange={(e) =>
                      handleSubmit(e, {
                        [name]: item.value,
                        [`${name}Code`]: item.code,
                      })
                    }
                  />
                  <label htmlFor={item.code}>{item.value}</label>
                </span>
              );
            })}
          </div>
        )}

        {(name === "price" || name === "area") && (
          <div className="">
            <div className=" p-12 py-20">
              <div className="flex flex-col justify-center items-center relative">
                <div className="z-30 absolute top-[-49px] font-semibold text-lg text-orange-600">
                  {persent1 === 100 && persent2 === 100
                    ? `Trên ${convert100toTarget(persent1)} ${
                        name === "price" ? "Triệu" : "m2"
                      }`
                    : `Từ ${
                        persent1 <= persent2
                          ? convert100toTarget(persent1)
                          : convert100toTarget(persent2)
                      } - ${
                        persent2 >= persent1
                          ? convert100toTarget(persent2)
                          : convert100toTarget(persent1)
                      } ${
                        name === "price" ? "triệu" : name === "area" ? "m2" : ""
                      }`}
                </div>
                <div
                  onClick={handleOnclickTrack}
                  id="track"
                  className="slider-track w-full cursor-pointer absolute top-0 bottom-0 h-[5px] bg-gray-300 rounded-full"
                ></div>
                <div
                  id="track-active"
                  onClick={handleOnclickTrack}
                  className="slider-track-active cursor-pointer absolute top-0 bottom-0 h-[8px] bg-orange-500 rounded-full"
                ></div>
                <input
                  type="range"
                  max="100"
                  min="0"
                  value={persent1}
                  step="1"
                  className="w-full appearance-none pointer-events-none absolute top-0 bottom-0 "
                  onChange={(e) => {
                    setpersent1(+e.target.value);
                    activeEl && setactiveEl("");
                  }}
                />
                <input
                  type="range"
                  max="100"
                  min="0"
                  step="1"
                  value={persent2}
                  className="w-full appearance-none pointer-events-none absolute top-0 bottom-0  "
                  onChange={(e) => {
                    setpersent2(+e.target.value);
                    activeEl && setactiveEl("");
                  }}
                />
                <div className="absolute top-6 left-0 right-0 flex items-center  justify-between ">
                  <span
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      // handleOnclickTrack(e, 0);
                      setpersent1(0);
                    }}
                  >
                    0
                  </span>

                  <span
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      // handleOnclickTrack(e, 100);
                      setpersent2(100);
                    }}
                  >
                    {name === "price"
                      ? "15 Triệu +"
                      : name === "area"
                      ? "Trên 90 m2"
                      : ""}
                  </span>
                </div>
              </div>
              <div className="mt-24">
                <h3 className="font-medium mb-4">Chọn nhanh</h3>
                <div className="flex gap-2  items-center flex-wrap w-full ">
                  {content?.map((item) => {
                    return (
                      <span
                        key={item?.code}
                        onClick={() => handleActive(item?.code, item?.value)}
                        className={`px-4 py-1 rounded-sm bg-gray-200 cursor-pointer ${
                          item?.code === activeEl
                            ? "bg-blue-500 text-white"
                            : ""
                        }`}
                      >
                        {item?.value}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="w-full bg-orange-500 font-bold py-2 rounded-bl-md rounded-br-md absolute bottom-0"
              onClick={handleBeforSubmit}
            >
              Ap dụng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Modal);

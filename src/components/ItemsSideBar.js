import React, { memo } from "react";
import icons from "../ultils/icons";
import { formatVietnam } from "../ultils/Common/formatVietnam";
import { Link } from "react-router-dom";
import * as actions from "../store/actions";
import { useDispatch } from "react-redux";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
const ItemsSideBar = ({ title, content, isdouble, type }) => {
  const { GrLinkNext } = icons;

  const location = useLocation();
  const navigate = useNavigate();

  const formatContent = () => {
    const oddEl = content?.filter((i, index) => index % 2 !== 0);
    const evenEl = content?.filter((i, index) => index % 2 === 0);
    const fomatContent = oddEl?.map((i, index) => {
      return {
        left: i,
        right: evenEl?.find((item2, index2) => index2 === index),
      };
    });

    return fomatContent;
  };
  const handleFilterPosts = (code) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({
        [type]: code,
      }).toString(),
    });
  };

  return (
    <div className="p-4 rounded-sm bg-white w-full">
      <div className="">
        <div className="flex flex-col gap-2 ">
          <h3 className="text-lg font-bold">{title}</h3>

          {!isdouble ? (
            <>
              {content?.length > 0 &&
                content?.map((i, index) => {
                  return (
                    <Link
                      to={`${formatVietnam(i.value)}`}
                      className=""
                      key={i.code}
                    >
                      <div className="flex gap-1 items-center text-gray-700 hover:text-orange-400 cursor-pointer border-b border-dashed border-gray-300">
                        <GrLinkNext size={10} />
                        <p className="">{i.value}</p>
                      </div>
                    </Link>
                  );
                })}
            </>
          ) : (
            <>
              {content?.length > 0 &&
                formatContent()?.map((i, index) => {
                  return (
                    <div key={i.code}>
                      <div className="flex">
                        <div
                          className="flex flex-1 gap-1 items-center text-gray-700 hover:text-orange-400 cursor-pointer border-b border-dashed border-gray-300"
                          onClick={() => handleFilterPosts(i.right.code)}
                        >
                          <GrLinkNext size={10} />
                          <p className="">{i?.right?.value}</p>
                        </div>
                        <div
                          className="flex flex-1 gap-1 items-center text-gray-700 hover:text-orange-400 cursor-pointer border-b border-dashed border-gray-300"
                          onClick={() => handleFilterPosts(i.left.code)}
                        >
                          <GrLinkNext size={10} />
                          <p className="">{i?.left?.value}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ItemsSideBar);

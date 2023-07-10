import React, { useEffect, useState } from "react";
import { Button, Items } from "../../components";
import { getPosts, getPostsPage } from "../../store/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
const List = ({ categoryCode }) => {
  const dispath = useDispatch();
  const { posts, count } = useSelector((state) => state.post);

  const [searchParams] = useSearchParams();
  const [sort, setsort] = useState(0);

  useEffect(() => {
    let params = [];
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }
    let searchParamObject = {};

    params?.forEach((i) => {
      if (Object.keys(searchParamObject)?.some((item) => item === i[0])) {
        searchParamObject[i[0]] = [...searchParamObject[i[0]], i[1]];
      } else {
        searchParamObject = { ...searchParamObject, [i[0]]: [i[1]] };
      }
    });
    if (categoryCode) searchParamObject.categoryCode = categoryCode;

    if (sort === 1) searchParamObject.order = ["createdAt", "DESC"];
    dispath(getPostsPage(searchParamObject));
  }, [searchParams, categoryCode, sort]);

  return (
    <>
      <div className="w-full border  p-2 bg-white shadow-md rounded-md">
        <div className="flex items-center justify-between my-3">
          <h4 className="text-xl font-semibold">Danh sách tin đăng</h4>
          <span>Cập nhật: 21:32 06/02/2023</span>
        </div>
        <div className="flex items-center gap-1 mb-2">
          <span>Sắp xếp:</span>
          <span
            onClick={() => setsort(0)}
            className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline  ${
              sort === 0 ? "bg-red-400 underline" : ""
            } `}
          >
            Mặc định
          </span>
          <span
            onClick={() => setsort(1)}
            className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${
              sort === 1 ? "bg-red-400 underline" : ""
            }`}
          >
            Mới nhất
          </span>
        </div>
        <div className="items">
          {/* <Items /> */}
          {posts?.length > 0 &&
            posts.map((item) => {
              return (
                <Items
                  key={item?.id}
                  address={item?.address}
                  attributes={item?.attributes}
                  description={JSON.parse(item?.description)}
                  images={JSON.parse(item?.images?.image)}
                  star={+item?.star}
                  title={item?.title}
                  user={item?.user}
                  id={item?.id}
                />
              );
            })}
        </div>
      </div>
      <div>{/* <Pagination length={posts?.length}  /> */}</div>
    </>
  );
};

export default List;

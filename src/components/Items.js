import React, { memo, useState } from "react";
import icons from "../ultils/icons";
import { useNavigate, Link } from "react-router-dom";
import { formatVietnam } from "../ultils/Common/formatVietnam";
import users from "../assets/user.jpg";
import { path } from "../ultils/constain";

// const indexs = [0, 1, 2, 3];

const { AiFillStar, BsFillBookmarkStarFill, AiFillHeart, AiOutlineHeart } =
  icons;

const Items = ({
  images,
  user,
  title,
  description,
  attributes,
  address,
  star,
  id,
}) => {
  const [isHoverHeart, setisHoverHeart] = useState(false);

  // console.log(user);
  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i < +star; i++) {
      stars.push(
        <AiFillStar
          className="star-items mr-2  "
          color="yellow"
          fontSize="1.5em"
        />
      );
    }

    return stars;
  };

  return (
    <div className="w-full flex item-center py-2 border-t border-orange-600 pt-[5px]">
      <Link
        to={`${path.DETAIL}${formatVietnam(title?.replaceAll("/", ""))}/${id}`}
        className="w-2/5 flex flex-wrap gap-[2px] items-center relative cursor-pointer"
      >
        {images.length > 0 &&
          images
            .filter((i, index) => [...Array(4).keys()].some((i) => i === index))
            ?.map((i, index) => {
              return (
                <img
                  key={index}
                  src={i}
                  alt="preview"
                  className="w-[47%] h-[120px] object-cover"
                />
              );
            })}

        <span className="bg-overlay-70 text-white px-2 rounded-md absolute left-1 bottom-1">
          {`${images.length} ảnh`}
        </span>
        <span
          className="text-white absolute right-7 bottom-1"
          onMouseEnter={() => setisHoverHeart(true)}
          onMouseLeave={() => setisHoverHeart(false)}
        >
          {isHoverHeart ? (
            <AiFillHeart color="red" size="24" />
          ) : (
            <AiOutlineHeart size="24" />
          )}
        </span>
      </Link>
      <div className="w-3/5">
        <div className="flex justify-between">
          <Link
            to={`${path.DETAIL}${formatVietnam(
              title?.replaceAll("/", "")
            )}/${id}`}
            className=" text-red-500 font-medium "
          >
            {handleStar(+star).length > 0 &&
              handleStar(+star).map((i, index) => {
                return <span key={index}>{i}</span>;
              })}
            {title}
          </Link>
          <div className="w-[10%] flex justify-end">
            <BsFillBookmarkStarFill color="orange" fontSize="1.5em" />
          </div>
        </div>
        <div className="my-2 flex items-center justify-between gap-2">
          <span className="font-bold flex-3 whitespace-nowrap overflow-hidden text-ellipsis text-green-600">
            {attributes?.price}
          </span>
          <span className="flex-1">{attributes?.acreage}</span>
          <span className="flex-3 whitespace-nowrap overflow-hidden text-ellipsis">{`${
            address.split(",")[address.split(",").length - 2]
          }, ${address.split(",")[address.split(",").length - 1]}`}</span>
        </div>
        <p className="text-gray-500 w-full h-[100px] text-ellipsis overflow-hidden">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 my-3">
            <img
              src={users}
              alt=""
              className="w-[30px] h-[30px] object-cover rounded-full"
            />
            <p>{user?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="bg-blue-700 text-white p-[2px] rounded-md"
            >
              {`Gọi ${user?.phone}`}
            </button>
            <a
              type="button"
              href={`https://zalo.me/${user?.phone}`}
              className="text-blue-700 px-1 bg-white border border-blue-700 rounded-md"
              target="_blank"
            >
              NHẮN ZALO
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Items);

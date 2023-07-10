import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostsPage } from "../../store/actions";
import { RelatedPost, Slider } from "../../components";
import icons from "../../ultils/icons";
import { Ri24HoursFill } from "react-icons/ri";
import { BiHash } from "react-icons/bi";
import BoxInfor from "../../components/BoxInfor";
import { useNavigate, createSearchParams } from "react-router-dom";
import { path } from "../../ultils/constain";
const { FaMapMarkerAlt, TbReportMoney, SlCrop } = icons;

const DetailPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const navigate = useNavigate();

  useEffect(() => {
    postId && dispatch(getPostsPage({ id: postId }));
  }, [postId]);
  const hadleLabel = () => {
    const titleText = `Tìm kiếm tin đăng theo chuyên mục ${posts[0]?.labelData?.value}`;

    navigate(
      {
        pathname: `/${path.SEARCH}`,
        search: createSearchParams({
          labelCode: posts[0]?.labelData?.code,
        }).toString(),
      },
      { state: { titleText } }
    );
  };

  return (
    <div className="my-[30px] w-full flex gap-4 ">
      <div className="w-[68%] bg-white rounded-sm shadow-sm">
        <Slider
          images={
            posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image)
          }
        />
        <div className="flex flex-col gap-2 p-5">
          <h2 className="text-xl font-bold text-red-600 my-2">
            {posts[0]?.title}
          </h2>
          <div className="flex gap-2">
            <span>Chuyên mục: </span>
            <span
              onClick={hadleLabel}
              className="text-blue-500 font-medium underline hover:text-orange-500 cursor-pointer"
            >
              {posts[0]?.labelData?.value}
            </span>{" "}
          </div>
          <div className="flex gap-2 items-center">
            <FaMapMarkerAlt color="#2563ec" />
            <span>{posts[0]?.address}</span>
          </div>
          <div className=" flex items-center justify-between">
            <span className="flex items-center gap-1">
              <TbReportMoney size="" />
              <span className="text-lg font-bold text-green-500">
                {posts[0]?.attributes?.price}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <SlCrop size="" />
              <span>{posts[0]?.attributes?.acreage}</span>
            </span>
            <span className="flex items-center gap-1">
              <Ri24HoursFill size="" />
              <span>{posts[0]?.attributes?.published}</span>
            </span>

            <span className="flex items-center gap-1">
              <BiHash size="" />
              <span>{posts[0]?.attributes?.hashtag}</span>
            </span>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold text-lg my-4">Thông tin mô tả</h3>
            <div className="flex flex-col gap-3">
              {posts[0]?.description &&
                JSON.parse(posts[0]?.description)?.map((item, index) => {
                  return <span key={index}>{item}</span>;
                })}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-lg my-4">Đặc điểm tin đăng</h3>
            <table className="w-full">
              <tbody className="w-full">
                <tr className="w-full">
                  <td className="p-4">Mã tin</td>
                  <td className="p-4">{posts[0]?.overview?.code}</td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="p-4">Khu vực</td>
                  <td className="p-4">{posts[0]?.overview?.area}</td>
                </tr>
                <tr className="w-full">
                  <td className="p-4">Loại tin rao</td>
                  <td className="p-4">{posts[0]?.overview?.type}</td>
                </tr>
                <tr className="w-full bg-gray-200 ">
                  <td className="p-4">Đối tượng</td>
                  <td className="p-4">{posts[0]?.overview?.target}</td>
                </tr>
                <tr className="w-full">
                  <td className="p-4">Gói tin</td>
                  <td className="p-4">{posts[0]?.overview?.bonus}</td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="p-4">Ngày đăng</td>
                  <td className="p-4">{posts[0]?.overview?.created}</td>
                </tr>
                <tr className="w-full">
                  <td className="p-4">Ngày hết hạn</td>
                  <td className="p-4">{posts[0]?.overview?.expired}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="font-semibold text-lg my-4">Thông tin liên hệ </h3>
            <table className="w-full">
              <tbody className="w-full">
                <tr className="w-full">
                  <td className="p-4">Liên hệ</td>
                  <td className="p-4">{posts[0]?.user?.name}</td>
                </tr>
                <tr className="w-full bg-gray-200">
                  <td className="p-4">Điện thoại</td>
                  <td className="p-4">{posts[0]?.user?.phone}</td>
                </tr>
                <tr className="w-full">
                  <td className="p-4">Zalo</td>
                  <td className="p-4">{posts[0]?.user?.zalo}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div></div>
        </div>
      </div>
      <div className="w-[32%]">
        <BoxInfor userData={posts[0]?.user} />
        <RelatedPost />
        <RelatedPost newPost />
      </div>
    </div>
  );
};

export default DetailPost;

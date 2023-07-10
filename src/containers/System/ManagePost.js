import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import Button from "../../components/Button";
import moment from "moment";
import "moment/locale/vi";
import UpdatePost from "./UpdatePost";
import { apiDeletePostPageNateManage } from "../../services/post";
import Swal from "sweetalert2";

const ManagePost = () => {
  const dispath = useDispatch();
  const { postOfCurrent, dataPostEdit } = useSelector((state) => state.post);
  const [isEdit, setisEdit] = useState(false);
  const [updateData, setupdateData] = useState(false);
  const [posts, setposts] = useState([]);
  const [status, setstatus] = useState("0");
  useEffect(() => {
    !dataPostEdit && dispath(actions.getPostPageManages());
  }, [dataPostEdit, updateData]);
  useEffect(() => {
    !dataPostEdit && setisEdit(false);
  }, [dataPostEdit]);

  useEffect(() => {
    setposts(postOfCurrent);
  }, [postOfCurrent]);
  useEffect(() => {
    if (status === 1) {
      const notExpried = postOfCurrent.filter((item) =>
        checkDateStatus(item?.overview?.expired.split(" ")[3])
      );
      setposts(notExpried);
    } else if (status === 2) {
      const expried = postOfCurrent.filter(
        (item) => !checkDateStatus(item?.overview?.expired.split(" ")[3])
      );
      setposts(expried);
    } else if (status === 0) {
      setposts(postOfCurrent);
    }
  }, [status]);

  const checkDateStatus = (datetime) => {
    let today = new Date().toDateString();
    return moment(datetime, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(
      today
    );
  };
  const handleDeletePost = async (postId) => {
    const response = await apiDeletePostPageNateManage(postId);
    if (response?.data?.err === 0) {
      setupdateData((prev) => !prev);
    } else {
      Swal.fire("Oops!", "Xóa tin đăng thất bại", "error");
    }
  };

  return (
    <div className="flex flex-col gap-6  ">
      <div className="border-b border-gray-200 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-medium ">Quản lý tin đăng</h1>
        <select
          onChange={(e) => setstatus(+e.target.value)}
          value={status}
          className="outline-none border p-2 border-gray-200 rounded-md"
        >
          <option value="0">Lọc theo trang thái</option>
          <option value="1">Đang hoạt động</option>
          <option value="2">Đã hết hạn</option>
        </select>
      </div>
      <table className="w-full">
        <thead>
          <tr className="flex w-full bg-blue-500">
            <th className="border flex-1 p-2">Mã tin</th>
            <th className="border flex-1 p-2">Ảnh đại diện</th>
            <th className="border flex-1 p-2">Tiêu đề</th>
            <th className="border flex-1 p-2">Giá</th>
            <th className="border flex-1 p-2">Ngày bắt đầu</th>
            <th className="border flex-1 p-2">Ngày hết hạn</th>
            <th className="border flex-1 p-2">Trạng thái</th>
            <th className="border flex-1 p-2">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {!posts ? (
            <tr>
              <td>trhjahjdh</td>
            </tr>
          ) : (
            posts?.map((item) => {
              return (
                <tr className="flex items-center h-16" key={item.id}>
                  <td className="flex px-2 justify-center items-center h-full flex-1 border ">
                    {item?.overview?.code}
                  </td>
                  <td className="flex px-2 items-center h-full flex-1 justify-center border ">
                    {" "}
                    <img
                      src={JSON.parse(item?.images?.image)[0] || ""}
                      alt="avatar-post"
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  </td>
                  <td className="flex px-2 justify-center items-center h-full flex-1 border ">
                    {`${item?.title?.slice(0, 40)}...`}
                  </td>
                  <td className="flex px-2 justify-center items-center h-full flex-1 border ">
                    {item?.attributes?.price}
                  </td>
                  <td className="flex px-2 justify-center items-center h-full flex-1 border ">
                    {item?.overview?.created}
                  </td>
                  <td className="flex px-2 justify-center items-center h-full flex-1 border ">
                    {item?.overview?.expired}
                  </td>
                  <td className="flex px-2 justify-center items-center h-full flex-1 border ">
                    {checkDateStatus(item?.overview?.expired.split(" ")[3])
                      ? "Đang hoạt đông"
                      : "Đã hết hạn"}
                  </td>
                  <td className="border h-full flex flex-1 p-2 justify-center items-center gap-4">
                    <Button
                      text="Sửa"
                      bgColor="bg-green-600"
                      textColor="text-white"
                      onClick={() => {
                        dispath(actions.dataPostEdit(item));
                        setisEdit(true);
                      }}
                    />
                    <Button
                      text="Xóa"
                      bgColor="bg-orange-600"
                      textColor="text-white"
                      onClick={() => handleDeletePost(item.id)}
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {isEdit && <UpdatePost isEdit={isEdit} setisEdit={setisEdit} />}
    </div>
  );
};

export default ManagePost;

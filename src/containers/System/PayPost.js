import React from "react";
import { Select } from "../../components";
import icons from "../../assets/icons.png";
const PayPost = () => {
  return (
    <div className="px-3">
      <h1 className="text-3xl font-semibold py-4 border-b border-b-gray-200">
        Thanh toán tin
      </h1>
      <div>
        <h1 className="text-3xl font-semibol py-4  ">Tiêu đề</h1>
      </div>
      <div className="flex gap-[30px] mb-4">
        <div className="flex flex-col w-1/5">
          <label htmlFor="">Chọn loại tin</label>
          <select className="outline-none border p-2 rounded-md border-gray-300 ">
            <option value="">Tin thường (2.000đ/ngày)</option>
          </select>
        </div>
        <div className="flex flex-col w-1/5">
          <label htmlFor="">Gói thời gian</label>
          <select className="outline-none border p-2 rounded-md border-gray-300 ">
            <option value="">Đăng theo ngày</option>
            <option value="">Đăng theo tuần</option>
            <option value="">Đăng theo tháng</option>
          </select>
        </div>
        <div className="flex flex-col w-1/5">
          <label htmlFor="">Số ngày</label>
          <select className="outline-none border p-2 rounded-md border-gray-300 ">
            <option value="">5 ngày</option>
          </select>
        </div>
      </div>
      <div>
        <label for="vehicle1"> Gán nhãn</label>
        <br />
        <div className="flex gap-2">
          <input type="checkbox" />
          <span>Cho thuê nhanh(2.000đ/ngày)</span>
        </div>
      </div>
      <div className="mt-5 mb-7">
        <h3 className="text-2xl font-bold">Chọn phương thức thanh toán</h3>
        <div className="flex  flex-col">
          <div className="flex gap-2">
            <div className="">
              <input type="radio" />
            </div>
            <div className="flex flex-col">
              <span>
                Trừ tiền trong tài khoản Phongtro123 (Bạn đang có: TK Chính 0)
              </span>
              <span className="text-red-500">
                Số tiền trong tài khoản của bạn không đủ để thực hiện thanh
                toán, vui lòng nạp thêm hoặc chọn phương thức khác bên dưới
              </span>
            </div>
          </div>
        </div>
        <div className="flex  flex-col">
          <div className="flex gap-2">
            <div className="">
              <input type="radio" />
            </div>
            <div className="flex flex-col">
              <span>Chuyển khoản ngân hàng</span>
              <span>
                Nội dung chuyển khoản: PT123 THANHTOAN 632833 THUONG 5 NGAY Số
                tiền chuyển khoản: 10.000đ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayPost;

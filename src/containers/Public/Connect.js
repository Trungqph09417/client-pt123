import React, { useState } from "react";
import { InputForms } from "../../components";
import Button from "../../components/Button";
const Connect = () => {
  const [payload, setpayload] = useState({
    name: "",
    phone: "",
    content: "",
  });
  const handleSubmit = () => {
    console.log(payload);
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl m-4">Liên hệ với chúng tôi</h1>
      <div className="flex gap-3">
        <div className="flex-1 flex flex-col h-fit gap-4 p-[30px] rounded-3xl text-white bg-gradient-to-br from-blue-700 to-cyan-400 ">
          <h4 className="font-semibold">Thông tin liên hệ</h4>
          <span>
            Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa
            chọn PhongTro123.Com
          </span>
          <span>Điện thoại: 0917 686 101</span>
          <span>Email: cskh.phongtro123@gmail.com</span>
          <span>Zalo: 0917 686 10</span>
          <span>Viber: 0917 686 101</span>
          <span>
            Địa chỉ: LD-06.04, Toà nhà Lexington Residence, Số 67 Mai Chí Thọ,
            Phường An Phú, Quận 2, Tp. Hồ Chí Minh.
          </span>
        </div>
        <div className="flex-1 bg-white shadow-md rounded-md p-[30px]">
          <h4 className="text-md font-semibold">Liên hệ trực tuyến</h4>
          <div className="flex flex-col gap-6">
            <InputForms
              label="Họ tên của bạn"
              value={payload.name}
              setValue={setpayload}
              keyPayload="name"
            />

            <InputForms
              label="Số điện thoại"
              value={payload.phone}
              setValue={setpayload}
              keyPayload="phone"
            />
            <div>
              <label htmlFor="desc">NỘI DUNG MÔ TẢ</label>
              <textarea
                className="outline-none bg-[#e8f0fe] rounded-md w-full p-2"
                id="desc"
                cols="30"
                rows="3"
                onChange={(e) =>
                  setpayload((prev) => ({ ...prev, content: e.target.value }))
                }
              ></textarea>
            </div>
            <Button
              text="Gửi liên hệ"
              bgColor="bg-blue-500"
              textColor="text-white"
              fullWidth
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;

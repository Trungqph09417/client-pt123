import React from "react";
import { dataContact } from "../ultils/Common/dataContact";
const Contact = () => {
  return (
    <div className="w-3/5 bg-white border border-dashed  flex flex-col items-center justify-center mt-6 p-[30px]">
      <div className="">
        <img className="h-[150px]" src={dataContact.img} />
      </div>
      <div className="mt-4">
        <span className="text-[#233762]">{dataContact.content}</span>
      </div>
      <div className="mt-4  flex justify-around w-full items-center">
        {dataContact.contentBlock.length > 0 &&
          dataContact.contentBlock.map((i, index) => {
            return (
              <div className="text-center" key={index}>
                <h3 className="text-[#f60] font-medium">{i.title}</h3>
                <div className="text-[#233762] font-semibold p-2 text-2xl">
                  Điện thoại: {i.phone}
                </div>
                <div className="text-[#233762] font-semibold p-2 text-2xl">
                  Zalo: {i.zalo}
                </div>
              </div>
            );
          })}
      </div>
      <div>
        <button className="bg-[#3961fb] py-[10px] px-[30px] rounded-md cursor-pointer hover:underline text-white">
          {" "}
          Gửi liên hệ
        </button>
      </div>
    </div>
  );
};

export default Contact;

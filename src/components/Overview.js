import React from "react";
import { InputFormV2, InputReadOnly, Select } from "./";
import { useSelector } from "react-redux";
const targets = [
  { code: "Nam", value: "Nam" },
  { code: "Nữ", value: "Nữ" },
  { code: "Tất cả", value: "Tất cả" },
];
const Overview = ({
  payload,
  setpayload,
  validateFields,
  setvalidateFields,
}) => {
  const { categories } = useSelector((state) => state.app);
  const { currentData } = useSelector((state) => state.user);
  const { dataPostEdit } = useSelector((state) => state.post);

  return (
    <div className="w-full ">
      <h2 className="font-semibold text-2xl ">Thông tin mô tả</h2>
      <div className="w-1/2">
        <Select
          validateFields={validateFields}
          setvalidateFields={setvalidateFields}
          value={payload.categoryCode}
          name="categoryCode"
          setValue={setpayload}
          options={categories}
          label="Loại chuyên mục"
        />
      </div>
      <InputFormV2
        validateFields={validateFields}
        setvalidateFields={setvalidateFields}
        value={payload.title}
        setValue={setpayload}
        name="title"
        label="Tiêu đề"
      />
      <div className=" flex flex-col gap-2">
        <label htmlFor="desc">Nội dung mô tả</label>
        <textarea
          validateFields={validateFields}
          id="desc"
          cols="30"
          rows="10"
          value={payload.description}
          onChange={(e) =>
            setpayload((prev) => ({ ...prev, description: e.target.value }))
          }
          onFocus={() => setvalidateFields([])}
          className="outline-none rounded-md border border-gray-300 w-full p-2"
        ></textarea>
        <small className="text-red-500 block w-full">
          {validateFields?.some((item) => item.name === "description") &&
            validateFields?.find((item) => item.name === "description").message}
        </small>
      </div>

      <div className="w-1/2 flex flex-col gap-2">
        <InputReadOnly
          label="Thông tin liên hệ"
          value={currentData?.name || currentData?.username}
        />
        <InputReadOnly label="Điện thoại" value={currentData?.phone} />
        <InputFormV2
          small="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
          label="Giá cho thuê"
          unit="đồng"
          name="priceNumber"
          value={payload.priceNumber}
          setValue={setpayload}
          validateFields={validateFields}
          setvalidateFields={setvalidateFields}
        />
        <InputFormV2
          value={payload.areaNumber}
          setValue={setpayload}
          label="Diện tích"
          unit="m2"
          name="areaNumber"
          validateFields={validateFields}
          setvalidateFields={setvalidateFields}
        />
        <Select
          value={payload.target}
          validateFields={validateFields}
          setvalidateFields={setvalidateFields}
          name="target"
          setValue={setpayload}
          options={targets}
          label="Đối tượng cho thuê"
        />
      </div>
    </div>
  );
};

export default Overview;

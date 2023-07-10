import React from "react";

const InputReadOnly = ({ label, value, direction, editPhone }) => {
  return (
    <div>
      {" "}
      <div
        className={`flex ${
          direction ? "flex-row items-center" : "flex-col  gap-2 "
        }  `}
      >
        <label className="w-48 flex-none font-semibold" htmlFor="ex-address">
          {label}
        </label>
        <div className="flex-auto">
          <input
            type="text"
            id="ex-address"
            readOnly
            className="border outline-none border-gray-200 rounded-md bg-gray-100 p-2 w-full"
            value={value || ""}
          />
          {editPhone && (
            <small className="text-blue-500 cursor-pointer">
              Đổi số điện thoại
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputReadOnly;

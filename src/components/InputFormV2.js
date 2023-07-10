import React from "react";

const InputFormV2 = ({
  label,
  unit,
  value,
  setValue,
  name,
  small,
  validateFields,
  setvalidateFields,
  direction,
}) => {
  return (
    <div>
      <div className={`my-4 flex ${direction ? direction : "flex-col"}`}>
        <label className="w-48 flex-none" htmlFor="title">
          {label}
        </label>
        <div className="flex flex-col gap-4 items-center w-full">
          <div className="flex flex-col w-full">
            <div className="flex flex-col">
              <div className="flex">
                <input
                  onFocus={() => setvalidateFields([])}
                  type="text"
                  id="title"
                  value={value}
                  onChange={(e) =>
                    setValue((prev) => ({ ...prev, [name]: e.target.value }))
                  }
                  className={`${
                    unit ? "rounded-l-md" : "rounded-md"
                  }  p-2 outline-none border flex-auto border-gray-300`}
                />
                {unit && (
                  <span className="p-[9px] rounded-r-md flex-none w-16 flex justify-center items-center bg-gray-200">
                    {unit}
                  </span>
                )}
              </div>
              {small && (
                <small className="opacity-70 whitespace-nowrap">{small}</small>
              )}
            </div>
          </div>
          {validateFields?.some((item) => item.name === name) && (
            <small className="text-red-500 block w-full">
              {validateFields?.find((item) => item.name === name).message}
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputFormV2;

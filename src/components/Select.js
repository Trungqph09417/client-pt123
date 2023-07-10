import React, { memo } from "react";

const Select = ({
  label,
  options,
  value,
  setValue,
  type,
  name,
  validateFields,
  setvalidateFields,
}) => {
  const handleSubmit = (e) => {
    !name
      ? setValue(e.target.value)
      : setValue((prev) => ({
          ...prev,
          [name]: e.target.value,
        }));
  };
  const handleError = () => {
    const nameInvalidField = validateFields?.find((item) => item.name === name);
    const addressField = validateFields?.find(
      (item) => item.name === "address"
    );
    // const targetField = validateFields?.find(
    //   (item) => item.name === "address"
    // );
    return (
      `${nameInvalidField ? nameInvalidField.message : ""}` ||
      `${addressField ? addressField.message : ""}`
    );
  };
  return (
    <div className="flex flex-col gap-2 flex-1">
      <label className="font-semibold" htmlFor="select-address">
        {label}
      </label>
      <select
        id="select-address"
        value={value}
        onChange={(e) => handleSubmit(e)}
        className="outline-none border border-gray-300 p-2 w-full rounded-md"
        onFocus={() => setvalidateFields([])}
      >
        <option value="">{`Chọn ${label} `}</option>
        {options?.map((item) => {
          return (
            <option
              key={
                type === "province"
                  ? item?.province_id
                  : type === "district"
                  ? item?.district_id
                  : item?.code
              }
              value={
                type === "province"
                  ? item?.province_id
                  : type === "district"
                  ? item?.district_id
                  : item?.code
              }
            >
              {type === "province"
                ? item?.province_name
                : type === "district"
                ? item?.district_name
                : item?.value}
            </option>
          );
        })}
      </select>
      {validateFields && (
        <small className="text-red-600">{handleError()}</small>
      )}
    </div>
  );
};

export default memo(Select);

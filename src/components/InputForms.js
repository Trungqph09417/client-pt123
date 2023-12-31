import React, { memo } from "react";

const InputForms = ({
  label,
  value,
  setValue,
  keyPayload,
  invalidFields,
  setinvalidFields,
  type,
}) => {
  return (
    <div>
      <label htmlFor={keyPayload} className="text-xs">
        {label}
      </label>
      <input
        type={type || "text"}
        id={keyPayload}
        className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [keyPayload]: e.target.value }))
        }
        onFocus={() => invalidFields && setinvalidFields([])}
      />
      {invalidFields?.some((i) => i.name === keyPayload) && (
        <small className="text-red-500 italic">
          {invalidFields.find((i) => i.name === keyPayload)?.message}
        </small>
      )}
      <small></small>
    </div>
  );
};

export default memo(InputForms);

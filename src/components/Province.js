import React from "react";
import { location } from "../ultils/constain";
import ProvinceBtn from "./ProvinceBtn";
const Province = () => {
  return (
    <div className="flex justify-center gap-6 ">
      {location.map((item) => {
        return (
          <ProvinceBtn
            key={item.id}
            image={item.image}
            name={item.name}
            provinceCode={item.provinceCode}
          />
        );
      })}
    </div>
  );
};

export default Province;

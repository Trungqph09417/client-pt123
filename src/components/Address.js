import React, { memo, useEffect, useState } from "react";
import Select from "./Select";
import {
  apiGetPublicProvince,
  apiGetPublicProvinceDistrict,
} from "../services/province";
import { useSelector } from "react-redux";
import InputReadOnly from "./InputReadOnly";
const Address = ({ setpayload, validateFields, setvalidateFields }) => {
  const { dataPostEdit } = useSelector((state) => state.post);
  const [provinces, setprovinces] = useState([]);
  const [districts, setdistricts] = useState([]);
  const [province, setprovince] = useState("");
  const [district, setdistrict] = useState("");

  useEffect(() => {
    if (dataPostEdit) {
      let addressArr = dataPostEdit?.address?.split(",");
      let findProvinceName =
        provinces?.length &&
        provinces?.find(
          (item) =>
            item?.province_name === addressArr[addressArr?.length - 1]?.trim()
        );
      setprovince(findProvinceName ? findProvinceName?.province_id : "");
    }
  }, [provinces, dataPostEdit]);
  useEffect(() => {
    if (dataPostEdit) {
      let addressArr = dataPostEdit?.address?.split(",");
      let findDistricName =
        districts?.length &&
        districts?.find(
          (item) =>
            item?.district_name === addressArr[addressArr?.length - 2]?.trim()
        );
      setdistrict(findDistricName ? findDistricName?.district_id : "");
    }
  }, [districts, dataPostEdit]);

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvince();
      if (response?.status === 200) {
        setprovinces(response?.data?.results);
      }
    };
    fetchPublicProvince();
  }, []);

  useEffect(() => {
    setdistrict("");
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicProvinceDistrict(province);
      if (response?.status === 200) {
        setdistricts(response?.data?.results);
      }
    };
    province && fetchPublicDistrict();
    !province && setdistricts([]);
  }, [province]);

  useEffect(() => {
    setpayload((prev) => ({
      ...prev,
      province: province
        ? `${
            provinces?.find((item) => item.province_id === province)
              ?.province_name
          }`
        : "",
      address: `${
        district
          ? `${
              districts?.find((item) => item.district_id === district)
                ?.district_name
            }, `
          : ""
      }${
        province
          ? `${
              provinces?.find((item) => item.province_id === province)
                ?.province_name
            }`
          : ""
      }`,
    }));
  }, [province, district]);

  return (
    <div>
      <h2 className="font-semibold text-2xl py-4">Địa chỉ cho thuê</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Select
            setvalidateFields={setvalidateFields}
            validateFields={validateFields}
            type="province"
            value={province}
            setValue={setprovince}
            options={provinces}
            label="Tỉnh/Thành phố"
          />
          <Select
            setvalidateFields={setvalidateFields}
            type="district"
            validateFields={validateFields}
            value={district}
            setValue={setdistrict}
            options={districts}
            label="Quận/Huyện"
          />
        </div>
        <InputReadOnly
          label="Địa chỉ chính xác "
          value={`${
            district
              ? `${
                  districts?.find((item) => item.district_id === district)
                    ?.district_name
                },`
              : ""
          } ${
            province
              ? `${
                  provinces?.find((item) => item.province_id === province)
                    ?.province_name
                }`
              : ""
          }`}
        />
      </div>
    </div>
  );
};

export default memo(Address);

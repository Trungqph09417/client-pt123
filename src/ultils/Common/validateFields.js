const validate = (payload, setinvalidFields) => {
  // console.log(payload);
  let invalid = 0;
  let field = Object.entries(payload);
  // console.log(field);
  field.forEach((item) => {
    if (item[1] === "") {
      setinvalidFields((prev) => [
        ...prev,
        {
          name: item[0],
          message: "Bạn không được bỏ trống trường này",
        },
      ]);
      invalid++;
    }
  });
  field.forEach((item) => {
    switch (item[0]) {
      case "password":
        if (item[1].length < 6) {
          setinvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Mật khẩu phải tối thiểu 6 kí tư",
            },
          ]);
          invalid++;
        }
        break;
      case "phone":
        if (!+item[1]) {
          setinvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Số điện thoại không hợp lệ",
            },
          ]);
          invalid++;
        }
        break;
      case "priceNumber":
      case "areaNumber":
        if (+item[1] === 0) {
          setinvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Chưa nhập giá trị ",
            },
          ]);
          invalid++;
        }
        if (!+item[1]) {
          setinvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Giá trị nhập phải là số ",
            },
          ]);
          invalid++;
        }
        break;

      default:
        break;
    }
  });
  return invalid;
};
export default validate;

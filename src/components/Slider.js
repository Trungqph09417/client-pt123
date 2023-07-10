import React, { memo } from "react";
import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const SliderCustom = ({ images }) => {
  return (
    <div className="w-full bg-green-600">
      <Slider {...settings}>
        {images?.length > 0 &&
          images.map((item, index) => {
            return (
              <div className="bg-black flex justify-end h-[320px]">
                <img
                  src={item}
                  alt=""
                  className="h-full object-contain m-auto"
                />
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default memo(SliderCustom);

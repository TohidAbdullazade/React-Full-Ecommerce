import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideShow = () => {
 // ===> DATAS FROM REACT SLICKY <===
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 3500,
    cssEase: "linear",
    pauseOnHover: true,
  };
// ===> POSTED IMAGES FOR THE SLIDESHOW <===
  const data = [
    "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ];
  // ===> DESCTURCT THE IMAGES FROM DATA ARRAY <===
  const [brand_1, brand_2, brand_3] = data;

  return (
    <>
      <Slider {...settings}>
        <div className="sliderImg-container relative">
          <div className="main-text_conatiner absolute top-44 flex justify-center w-full">
            <div className="title">
              <span className="text-5xl text-gray-600 font-bold capitalize">
                We have the freshest and cleanest brands in the world!
              </span>
              <p className="text-5xl text-center text-gray-600 font-bold">
                All for you!
              </p>
            </div>
          </div>
          <img
            src={brand_1}
            className=" w-full  object-cover  "
            style={{ height: 500, backgroundPosition: "center" }}
          />
        </div>
        <div className="sliderImg-container relative">
          <div className="main-text_conatiner absolute top-44 flex justify-center w-full">
            <div className="title">
              <span className="text-5xl text-red-800 font-bold capitalize">
                different varieties for ladies and gents we have it all!
              </span>
            </div>
          </div>
          <img
            src={brand_2}
            className=" w-full  object-cover  "
            style={{ height: 500, backgroundPosition: "center" }}
          />
        </div>
        <div className="sliderImg-container relative">
          <div className="main-text_conatiner absolute top-44 flex justify-center w-full">
            <div className="title">
              <span className="text-5xl text-orange-500 font-bold capitalize">
                we have both classic and the latest fashion!
              </span>
            </div>
          </div>
          <img
            src={brand_3}
            className=" w-full  object-cover  "
            style={{ height: 500, backgroundPosition: "center" }}
          />
        </div>
      </Slider>
    </>
  );
};

export default SlideShow;

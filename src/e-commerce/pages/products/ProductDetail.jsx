import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { GET_SINGLE_PRODUCTS_FOR_SITE } from "../../../services/Product";
import { useParams } from "react-router-dom";
import {  Rate,  Spin } from "antd";
import Header from "../../components/Header";

const ProductDetail = () => {
  const [data, setData] = useState({}); // STATE
  const [load, setLoad] = useState(false); // STATE
  const [selectedSize, setSelectedSize] = useState(""); //STATE
  const { id } = useParams(); // PARAMS

  // ===> GET THE SINGLE PROODUCT FOR SITE <===
  const getData = () => {
    setLoad(true);
    GET_SINGLE_PRODUCTS_FOR_SITE(id)
      .then(({ data }) => {
        setData(data);
        setLoad(false);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);
 
  // ===> HANDLE THE SIZE SELECT <===
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <>
    <Header/>
      {load ? (
        <Spin spinning />
      ) : (
        <div className="font-[sans-serif]">
          <div className="p-6 lg:max-w-6xl max-w-2xl mx-auto ">
            <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 ">
              <div className="w-full lg:sticky top-0 sm:flex gap-2">
                <div className="sm:space-y-3 w-16 max-sm:flex max-sm:mb-4 max-sm:gap-4">
                  {data.images &&
                    data.images.map((item,index) => (
                      <img
                        src={item.url}
                        key={index}
                        onClick={() =>
                          setData({ ...data, mainImage: item.url })
                        }
                        style={{ cursor: "pointer" }}
                      />
                    ))}
                </div>
                <img
                  src={data.mainImage || (data.images && data.images[0].url)}
                  alt={data.title}
                  className="w-4/5 rounded object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-gray-800">
                  {data.title}
                </h2>
                <div className="flex flex-wrap gap-4 mt-4">
                  <p className="text-gray-800 text-xl font-bold">
                    ${data.salePrice}
                  </p>
                  <p className="text-red-500 text-xl">
                    <strike>${data.productPrice}</strike>
                   
                  </p>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Rate  defaultValue={5}  disabled />
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-800">Sizes</h3>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <button
                      type="button"
                      className={`w-12 h-12 border-2 hover:border-gray-800 font-bold text-sm rounded-full flex items-center justify-center shrink-0 ${
                        selectedSize === "SM" ? "border-gray-800" : ""
                      }`}
                      onClick={() => handleSizeSelect("SM")}
                    >
                      SM
                    </button>
                    <button
                      type="button"
                      className={`w-12 h-12 border-2 hover:border-gray-800 font-bold text-sm rounded-full flex items-center justify-center shrink-0 ${
                        selectedSize === "MD" ? "border-gray-800" : ""
                      }`}
                      onClick={() => handleSizeSelect("MD")}
                    >
                      MD
                    </button>
                    <button
                      type="button"
                      className={`w-12 h-12 border-2 hover:border-gray-800 font-bold text-sm rounded-full flex items-center justify-center shrink-0 ${
                        selectedSize === "LG" ? "border-gray-800" : ""
                      }`}
                      onClick={() => handleSizeSelect("LG")}
                    >
                      LG
                    </button>
                    <button
                      type="button"
                      className={`w-12 h-12 border-2 hover:border-gray-800 font-bold text-sm rounded-full flex items-center justify-center shrink-0 ${
                        selectedSize === "XL" ? "border-gray-800" : ""
                      }`}
                      onClick={() => handleSizeSelect("XL")}
                    >
                      XL
                    </button>
                  </div>
                  {/* <button
                    type="button"
                    className="w-full mt-4 px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded"
                  >
                    Add to cart
                  </button> */}
                </div>
                <div className="mt-8 border text-center ">
                  <h3 className="text-lg font-bold text-gray-800">
                    About the item
                  </h3>
                  <p className="text-gray-400 text-base text-justify -start px-5 border-t">
                    {data.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ProductDetail;

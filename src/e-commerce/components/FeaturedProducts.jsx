import React, { useEffect, useState } from "react";
import { GET_ALL_PRODUCTS_FROM_SITE } from "../../services/Product";
import { Image, Popover, Spin, message } from "antd";
import { FaRegEye } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useBasket } from "../../context/BasketContext";
import { SET_PRODUCT_TO_BASKET } from "../../services/Basket";

const FeaturedProducts = ({ data, setData }) => {
  const [load, setLoad] = useState(false); // STATE
  const { basket, isLoggedIn, setBasket } = useBasket(); // STATE
  const navigate = useNavigate(); // NAVIGATE

  // ===> FETCH ALL PRODUCTS FROM SERVER <===
  const getDataForSite = () => {
    setLoad(true);
    GET_ALL_PRODUCTS_FROM_SITE()
      .then(({ data }) => {
        setData(data.product);
        setLoad(false);
      })
      .catch((err) => {
        message.error(`${err.message} Please Refresh the Page`);
        console.log(err.message);
      });
  };

  useEffect(() => {
    getDataForSite();
  }, []);

  // ===> SET PRODUCTS TO BASKET <===
  const AddToCard = (id, title, images, price) => {
    const existingProductIndex = basket.findIndex(
      (item) => item.productId === id
    );
    if (existingProductIndex !== -1) {
      toast.info(
        `${title} is already in your cart but the count has increased !`,
        {
          position: "top-center",
          autoClose: 3000,
          draggable: true,
          pauseOnHover: true,
          closeButton: true,
          style: { writingMode: "revert", width: 500 },
        }
      );
      // ===> IF THE PRODUCT IS EXIST IN YOUR CARD ONLY THE COUNT INCREASE AND SET IT TO LOCAL STORAGE  <===
      const updatedBasket = [...basket];
      const updatedCount = (updatedBasket[
        existingProductIndex
      ].productCount += 1);
      setBasket(updatedBasket, updatedCount);
      localStorage.setItem("basket", JSON.stringify(basket));
    }
    // ===> IF THE PRODUCT IS NEW THEN ADDED TO YOUR CARD <===
    else {
      const updatedBasket = [
        ...basket,
        {
          productId: id,
          productCount: 1,
          productTitle: title,
          productImages: images,
          productPrice: price,
        },
      ];

      // ===>IF THE USER IS LOGGED IN THEN POST THE PRODUCT TO THE SERVER <===
      if (isLoggedIn) {
        setBasket(updatedBasket);
        SET_PRODUCT_TO_BASKET({ basket: updatedBasket })
          .then(({ data }) => {
            setBasket(data);
            console.log(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      // ===> ELSE POST IT TO THE LOCALE STORAGE <===
      else {
        setBasket(updatedBasket);
        localStorage.setItem("basket", JSON.stringify(updatedBasket));
        toast.success(`${title} was added to your Card!`, {
          position: "top-center",
          autoClose: 3000,
          draggable: true,
          pauseOnHover: true,
        });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="featured_products_container  my-24 mx-24">
        <div className="top_container w-full flex items-center justify-between my-20 ">
          <h1
            className="text-4xl  text-red-400 capitalize "
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Products
          </h1>
          <p
            className="text-justify px-20 text-gray-400 ml-20 text-[15px] "
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Welcome to our exquisite collection of products, where every item
            tells a story of craftsmanship, quality, and style. Immerse yourself
            in a world of luxury and indulgence as you explore our range of
            timeless classics and contemporary must-haves. Whether you're
            seeking the perfect gift or treating yourself to something special,
            our handpicked assortment is sure to inspire and delight. Discover
            the art of living beautifully with our featured products.
          </p>
        </div>

        {load ? (
          <Spin spinning />
        ) : (
          <div className="bottom-container grid grid-cols-4 gap-5  ">
            {data.map((item) => (
              <div
                key={item._id}
                className="bg-gray-100 rounded-2xl p-6 cursor-pointer hover:-translate-y-2 transition-all relative"
              >
                <div className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 right-1">
                  <MdFavoriteBorder size={22} fill="red" />
                </div>
                <Link to={`product-detail/${item._id}`}>
                  <div className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-16 right-1">
                    <Popover
                      placement="bottom"
                      title="View The Product Detail"
                      trigger={"hover"}
                    >
                      <FaRegEye size={22} fill="green" />
                    </Popover>
                  </div>
                </Link>
                <div className="max-lg:w-11/12 w-4/5 h-[220px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                  <Image
                    src={item.images[0].url}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {item.title}
                  </h3>
                  <h4 className="text-xl text-gray-700 font-bold mt-4">
                    ${item.salePrice}
                    <s className="text-red-500 ml-2 font-medium">
                      ${item.productPrice}
                    </s>
                  </h4>
                  <button
                    onClick={() =>
                      AddToCard(
                        item._id,
                        item.title,
                        item.images[0].url,
                        item.salePrice
                      )
                    }
                    type="button"
                    className="w-full mt-6 px-4 py-3 bg-[#333] hover:bg-gray-300 hover:text-black   text-white rounded-full"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FeaturedProducts;

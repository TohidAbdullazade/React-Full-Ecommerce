import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button, Image } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BasketPage = () => {
  const [basket, setBasket] = useState([]); // STATE
  const [totalPrice, setTotalPrice] = useState(0); // STATE

  // ===> GET THE STORED BASKET FROM LOCALE STORAGE <===
  const GET_BASKET_DATA_FROM_STORAGE = () => {
    let basketData = JSON.parse(localStorage.getItem("basket"));
    setBasket(basketData);
    //console.log(basketData)
  };

  useEffect(() => {
    GET_BASKET_DATA_FROM_STORAGE();
  }, []);

  // ===> CALCULATE THE TOTAL PRODUCT PRICE <===
  const calculateTotal = () => {
    let total = 0;
    basket &&
      basket.forEach((item) => {
        total += item.productPrice * item.productCount;
      });
    setTotalPrice(total);
    localStorage.setItem("totalPrice", total);
  };

  useEffect(() => {
    calculateTotal();
  }, [basket]);

  // ===> DELETE PRODUCT FROM STORAGE <===
  const deleteItem = (id, title) => {
    let deletedItemFromStorage = JSON.parse(localStorage.getItem("basket"));
    const updatedBasket = deletedItemFromStorage.filter(
      (item) => item.productId !== id
    );
    setBasket(updatedBasket);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
    toast.error(`${title} was deleted from card!`, {
      position: "top-center",
      autoClose: 3000,
      draggable: true,
      pauseOnHover: true,
    });
  };
  // ===> INCREASE THE PRODUCT COUNT <===
  const increaseProduct = (id) => {
    const updatedBasket = basket.map((item) => {
      if (item.productId === id) {
        return { ...item, productCount: item.productCount + 1 };
      }
      return item;
    });
    setBasket(updatedBasket);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
    calculateTotal(); // CALL THE CALCULATE METHOD BECAUSE I INCREASE THE COUNT SO THE COUNT CHANGE DINAMIC AND THAT EFFECT ON THE PRİCE
  };

  // ===> DECREASE THE PRODUCT COUNT <===
  const decreaseProduct = (id) => {
    const updatedBasket = basket.map((item) => {
      if (item.productId === id && item.productCount >= 1) {
        return { ...item, productCount: item.productCount - 1 };
      }
      return item;
    });
    setBasket(updatedBasket);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
    calculateTotal(); // CALL THE CALCULATE METHOD BECAUSE I DECREASE THE COUNT SO THE COUNT CHANGE DINAMIC AND THAT EFFECT ON THE PRİCE
  };
  return (
    <>
      <ToastContainer />
      <div className="font-[sans-serif] bg-white py-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[#333]">Shopping Cart</h2>
          <div className="overflow-x-auto">
            <table className="mt-12 w-full border-collapse divide-y">
              <thead className="whitespace-nowrap text-left">
                <tr>
                  <th className="text-base text-gray-500 p-4">Description</th>
                  <th className="text-base text-gray-500 p-4">Quantity</th>
                  <th className="text-base text-gray-500 p-4">Remove</th>
                  <th className="text-base text-gray-500 p-4">Price</th>
                </tr>
              </thead>
              <tbody className="whitespace-nowrap divide-y ">
                <>
                  {basket &&
                    basket.map((item) => (
                      <tr key={item.productId}>
                        <td className="py-6 px-4 ">
                          <div className="flex items-center  gap-6 w-max">
                            <div className=" shrink-0 ">
                              <Image
                                width={250}
                                height={200}
                                src={item.productImages}
                                className=" object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-lg font-bold text-[#333]">
                                {item.productTitle}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-6 px-4 ">
                          <div className="flex divide-x border w-max">
                            <button
                              type="button"
                              className="bg-gray-100 px-4 py-2 font-semibold"
                            >
                              <FaMinus
                                onClick={() => decreaseProduct(item.productId)}
                              />
                            </button>
                            <button
                              type="button"
                              className="bg-transparent px-4 py-2 font-semibold text-[#333] text-md"
                            >
                              {item.productCount}
                            </button>
                            <button
                              type="button"
                              className="bg-gray-800 text-white px-4 py-2 font-semibold"
                            >
                              <FaPlus
                                onClick={() => increaseProduct(item.productId)}
                              />
                            </button>
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          <Button type="default" className="bg-red-200">
                            <FaTrash
                              fill="red"
                              onClick={() =>
                                deleteItem(item.productId, item.productTitle)
                              }
                            />
                          </Button>
                        </td>
                        <td className="py-6 px-4 ">
                          <h4 className="text-lg font-bold text-[#333]">
                            ${item.productPrice}
                          </h4>
                        </td>
                      </tr>
                    ))}
                </>
              </tbody>
            </table>
            <hr />
          </div>
          <div className=" max-w-xl ml-auto mt-6 ">
            <p className="flex flex-wrap gap-4 text-md py-3 px-3 font-bold border">
              Total <span className="ml-auto">${totalPrice}</span>
            </p>

            <Link to={"/register"}>
              <button
                type="button"
                className="mt-6 text-md px-6 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Check out
              </button>
            </Link>
            <Link to={"/"}>
              <button
                type="button"
                className="mt-6 text-md px-6 py-2.5 w-full bg-red-500 hover:bg-red-700 text-white rounded"
              >
                Back To Shop
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasketPage;

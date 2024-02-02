import React, { useEffect, useState, memo, useContext } from "react";
import { GET_ALL_PRODUCTS_FROM_SITE } from "../../services/Product";
import { Button, Card, Image, Space, Spin } from "antd";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SET_PRODUCT_TO_BASKET } from "../../services/Basket";
import { BasketContext } from "../../context/BasketContext";

const FeaturedProducts = ({ data, setData }) => {
  const [load, setLoad] = useState(false);
  const { basket, setBasket } = useContext(BasketContext);

  const getDataForSite = () => {
    setLoad(true);
    GET_ALL_PRODUCTS_FROM_SITE().then(({ data }) => {
      setData(data.product);
      setLoad(false);
      //  console.dir(data);
    });
  };

  useEffect(() => {
    getDataForSite();
  }, []);

  const AddToCard = (id, title) => {
    setBasket((prev) => ({
      productId: id,
      productCount: prev.productCount + 1,
    }));

    console.log(basket);

    // setBasket({
    //   ...basket,
    //   productId: id,
    //   productCount: basket.productCount + 1,
    // });

    //  let basketInfo = {
    //    productId: id,
    //    productCount: basket.productCount + 1
    //  };

    // let updatedBasket = Array.from(basket).concat(basketInfo);
    //  console.log(updatedBasket);

    //  SET_PRODUCT_TO_BASKET({...basket})
    //    .then(({ data }) => {
    //      setBasket(data);
    //      console.log(data);
    //    })
    //    .catch((err) => {
    //      console.log(err.message);
    //    });

    const notify = () => {
      toast.success(`${title} Was Added To Your Card`, {
        position: "top-center",
        closeButton: true,
        draggable: true,
        pauseOnHover: true,
        autoClose: 1500,
      });
    };
    notify();
  };

  return (
    <>
      <ToastContainer />
      <div className="featured_products_container my-24 mx-24">
        <div className="top_container flex items-center justify-between my-5">
          <h1
            className="text-4xl w-full text-red-400 capitalize"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Featured Products
          </h1>
          <p
            className="text-justify px-20 text-gray-400"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            vitae quas, aliquam est odio molestias laboriosam architecto
            similique illum, quisquam tenetur labore nulla iusto quam.
            Dignissimos est mollitia maxime tempore?
          </p>
        </div>

        {load ? (
          <Spin spinning />
        ) : (
          <div className="bottom-container grid grid-cols-5 gap-5">
            {data.map((item) => (
              <Space key={item._id}>
                <Card
                  style={{ minHeight: 550 }}
                  loading={load}
                  actions={[
                    <>
                      <Space>
                        <Link to={`product-detail/${item._id}`}>
                          <Button>
                            <FaRegEye size={22} fill="green" />
                          </Button>
                        </Link>

                        <Button onClick={() => AddToCard(item._id, item.title)}>
                          <MdOutlineAddShoppingCart size={22} fill="blue" />
                        </Button>

                        <Button>
                          <MdFavoriteBorder size={22} fill="red" />
                        </Button>
                      </Space>
                    </>,
                  ]}
                  hoverable
                  className="w-full px-2.5 my-5"
                  title="Product"
                  cover={item.images.map((img) => (
                    <Space key={img.public_id}>
                      <Image src={img.url} width={230} height={230} />
                    </Space>
                  ))}
                >
                  <div style={{ minHeight: 120 }}>
                    <p
                      className="text-gray-400 text-sm w-full font-semibold"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      Name: {item.title}
                    </p>
                    <s
                      className="text-sm w-full text-red-500 font-semibold"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      Price ${item.productPrice}
                    </s>
                    <p
                      className="text-gray-400 text-sm w-full font-semibold"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      SalePrice: ${item.salePrice}
                    </p>
                  </div>
                </Card>
              </Space>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default memo(FeaturedProducts);

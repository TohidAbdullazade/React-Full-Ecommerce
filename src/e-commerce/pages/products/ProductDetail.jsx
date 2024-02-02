import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { GET_SINGLE_PRODUCTS_FOR_SITE } from "../../../services/Product";
import { useParams } from "react-router-dom";
import { Button, Card, Image, Space } from "antd";
import { MdFavoriteBorder, MdOutlineAddShoppingCart } from "react-icons/md";
import Meta from "antd/es/card/Meta";

const ProductDetail = () => {
  const [data, setData] = useState({});
  const [load, setLoad] = useState(false);
  const { id } = useParams();

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

  return (
    <>
     
      <div className="product_detail_are h-full w-full flex justify-center items-center">
        <div className="product_detail-conatainer px-5 py-5 ">
          <Space>
            <Card
              style={{ minWidth: 300,}}
              loading={load}
              actions={[
                <Space>
                  <Button>
                    <MdOutlineAddShoppingCart size={22} fill="blue" />
                  </Button>
                  ,
                  <Button>
                    <MdFavoriteBorder size={22} fill="red" />
                  </Button>
                </Space>,
              ]}
              cover={
                data.images &&
                data.images.length > 0 && (
                  <Image  width={"300px"} src={data.images[0].url} alt={data.title} />
                )
              }
              hoverable
              className=""
              title="Product"
            >
              <Meta
                title={data.title}
                description={`Desc:${data.description}`}
              ></Meta>
            </Card>
          </Space>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;

import React, { useEffect, useState } from "react";
import { GET_ALL_PRODUCTS_FROM_SITE } from "../../../services/Product";
import CustomPagenation from "../../../dashboard/components/CustomPagenation";
import Footer from "../../components/Footer";
import { Card, List, Space } from "antd";
import { BiMessageDetail } from "react-icons/bi";
import { MdAddShoppingCart } from "react-icons/md";

const ProductList = () => {
  const [data, setData] = useState([]);
  // ===> PAGENATION <===
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  data.slice(firstPostIndex, lastPostIndex);

  const getProducts = () => {
    GET_ALL_PRODUCTS_FROM_SITE()
      .then(({ data }) => {
        setData(data.product);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="flex gap-5">
        <div className="">
          <List
            className="flex gap-5"
            renderItem={(items) => {
              return (
                <Space direction="horizontal">
                  <Card
                    title={items.title}
                    actions={[
                      <BiMessageDetail
                        className="text-center text-green-400"
                        size={22}
                      />,
                      <MdAddShoppingCart
                        className="text-center text-red-400"
                        size={22}
                      />,
                    ]}
                  >
                    <p>{items.description}</p>
                    <img src={items.images.url} alt={items.images.public_id} />
                  </Card>
                </Space>
              );
            }}
          ></List>
        </div>
      </div>

       <CustomPagenation
        totalPost={data.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
      /> 

      <Footer />
    </>
  );
};

export default ProductList;
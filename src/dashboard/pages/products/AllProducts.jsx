import React, { useEffect, useState } from "react";
import { DELETE_PRODUCTS, GET_ALL_PRODUCTS } from "../../../services/Product";
import CustomPagenation from "../../components/CustomPagenation";
import { Link, useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

import { Button, Card, Image, Modal, Space, Table, message } from "antd";

const AllProducts = () => {
  const [data, setData] = useState([]); // STATE
  const [customTotalCount, setCustomTotalCount] = useState(0); // PAGES
  const [load, setLoad] = useState(false); // STATE

  // ===> PAGENATION <===
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  data.slice(firstPostIndex, lastPostIndex);

  // ===> FETCH DATA FROM SERVER <===
  const getData = () => {
    setLoad(true);
    GET_ALL_PRODUCTS(currentPage, postPerPage)
      .then(({ data }) => {
        setData(data.product);

        setCustomTotalCount(data.totalCount);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, [currentPage, postPerPage]);

  // ===> DELETE DATA FROM SERVER AND UI <===
  const deleteProduct = (id, title) => {
    Modal.confirm({
      title: `Are You Sure To Delete ${title} ?`,
      okButtonProps: { className: "bg-green-500 border-0" },
      okText: "Yes",
      cancelText: "No",
      cancelButtonProps: { className: "bg-red-500 border-0 text-white" },
      onOk: () => {
        DELETE_PRODUCTS(id)
          .then(() => {
            getData();
          })
          .catch((err) => {
            console.log(err.message);
          });
      },
      onCancel: () => {
        return message.success("The Operation was canceled from User !");
      },
    });
  };

  return (
    <>
      <div>
        <Card>
          <Table
            className="border text-center   "
            loading={load}
            columns={[
              {
                title: "Title",
                dataIndex: "title",
              },
              {
                title: "Description",
                dataIndex: "description",
              },
              {
                title: "SalePrice",
                render: (_, value) => (
                  <span className="font-bold ">$ {value.salePrice}</span>
                ),
              },
              {
                title: "ProductPrice",
                render: (_, value) => (
                  <span className="font-bold ">$ {value.productPrice}</span>
                ),
              },
              {
                title: "Stock",
                dataIndex: "stock",
              },
              {
                title: "Image",
                render: (item) => {
                  return (
                    <Space>
                      {item.images.map((img, i) => (
                        <Image key={i} width={50} height={50} src={img.url} />
                      ))}
                    </Space>
                  );
                },
              },
              {
                title: "Actions",
                render: (_, value) => {
                  return (
                    <Space>
                      <Link to={`/admin/update-products/${value._id}`}>
                        <Button>
                          <CiEdit size={22} fill="green" />
                        </Button>
                      </Link>

                      <Button
                        onClick={() => deleteProduct(value._id, value.title)}
                      >
                        <MdDeleteOutline size={22} fill="red" />
                      </Button>
                    </Space>
                  );
                },
              },
            ]}
            dataSource={data.map((item) => ({ ...item, key: item._id }))}
            pagination={false}
          ></Table>
          {/* ===> CUTOM PAGENATION <=== */}
          <CustomPagenation
            totalPost={customTotalCount}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
          />
        </Card>
      </div>
    </>
  );
};
export default AllProducts;

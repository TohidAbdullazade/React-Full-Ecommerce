import React, { useEffect, useState } from "react";
import { DELETE_BRANDS, GET_ALL_BRANDS } from "../../../services/Brands";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Button, Image, Modal, Space, Table, message } from "antd";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineImageNotSupported } from "react-icons/md";

const AllBrands = () => {
  const [data, setData] = useState([]); // STATE
  const [loading, setLoading] = useState(false); // STATE
  //const [img, setImg] = useState([]); // STATE
  const navigate = useNavigate(); // NAVIGATION

  // ===> FETCH ALL BRANDS FROM SERVER <===
  const getDatas = () => {
    setLoading(true);
    GET_ALL_BRANDS()
      .then(({ data }) => {
        setData(data);
        setLoading(false);

        // const items = res.data.map((product) => {
        //   return product.image ? product.image.url : null;
        // });
        // setImg(items);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getDatas();
  }, []);

  // ===> DELETE BRANDS <===
  const deleteItem = (id, title) => {
    Modal.confirm({
      title: `Are You Sure To Delete ${title} ?`,

      onOk: () => {
        DELETE_BRANDS(id)
          .then(() => {
            getDatas();
            return message.success("Was Deleted Successfly");
          })
          .catch((err) => console.log(err.message));
      },
      onCancel: () => {
        return message.info("Operation cancelled by Admin");
      },
    });
  };
  //  ===> ADD TO STORAGE  || NAVIGATE TO THE UPDATE PAGE <===
  const SET_TO_STORAGE = (id, name, imgUrl) => {
    localStorage.setItem("brandName", name);
    localStorage.setItem("brandId", id);
    localStorage.setItem("brandImage", imgUrl);

    navigate("/admin/update-brands");
  };
  return (
    <>
      <div className="brand-container px-10 my-5">
        <h1 className="border text-xl ">Brands Counts : {data.length}</h1>
        <Table
          loading={loading}
          columns={[
            {
              title: "Brand",
              dataIndex: "name",
            },
            {
              title: "Image",
              render: (_, value) => {
                return (
                  <Space>
                    {value.image ? (
                      <Image
                        width={50}
                        key={value.brandId}
                        src={value.image.url}
                      />
                    ) : (
                      <MdOutlineImageNotSupported size={40} />
                    )}
                  </Space>
                );
              },
            },
            {
              title: "Actions",
              render: (_, value) => {
                return (
                  <Space>
                    <Link to={`/admin/update-brands/${value._id}`}>
                      <Button
                        onClick={() =>
                          SET_TO_STORAGE(value._id, value.name, value.image.url)
                        }
                      >
                        <CiEdit size={22} color="green" />
                      </Button>
                    </Link>
                    <Button onClick={() => deleteItem(value._id, value.name)}>
                      <MdDeleteOutline color="red" size={22} />
                    </Button>
                  </Space>
                );
              },
            },
          ]}
          pagination={{ pageSize: 5 }}
          dataSource={data.map((item) => ({ ...item, key: item._id }))}
        ></Table>
      </div>
    </>
  );
};

export default AllBrands;

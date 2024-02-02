import React, { useEffect, useState } from "react";
import { UPDATE_BRANDS } from "../../../services/Brands";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Space, Typography, Upload } from "antd";

const UpdateBrands = () => {
  const [brand, setBrand] = useState({ name: "", image: "", id: 0 });
  const navigate = useNavigate();

  const GET_DATA_FROM_STORAGE = () => {
    setBrand({
      name: localStorage.getItem("brandName" || null),
      image: localStorage.getItem("brandImage" || ""),
      id: localStorage.getItem("brandId"),
    });
  };
  useEffect(() => {
    GET_DATA_FROM_STORAGE();
  }, []);

  const handleFileChange = (fileList) => {
    const files = fileList.file;
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setBrand((prev) => {
        return {
          ...prev,
          image: e.target.result,
        };
      });
    };
    fileReader.readAsDataURL(files);
  };

  const handleSubmit = () => {
   
    UPDATE_BRANDS(brand.id, {...brand})
      .then(({ data }) => {
        setBrand((prev) => {
          return {
            ...prev,
            data,
          };
        });
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    navigate("/admin/all-brands");
  };

  return (
    <div className="min-w-[800px] border p-10 m-10 ">
      <Form onFinish={handleSubmit}>
        <Typography.Title level={3} className="text-center">
          Update Brands
        </Typography.Title>
        <Form.Item>
          <Input
            type="text"
            name="brandName"
            value={brand.name}
            placeholder="type name"
            onChange={(e) => setBrand({ ...brand, name: e.target.value })}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Upload
              multiple
              listType="picture"
              fileList={[
                {
                  name: "image",
                  uid: brand.id,
                  url: brand.image,
                },
              ]}
              customRequest={handleFileChange}
            >
              <Button>Upload File</Button>
            </Upload>
            <Button htmlType="submit" className="my-2.5">
              Update Brand
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateBrands;

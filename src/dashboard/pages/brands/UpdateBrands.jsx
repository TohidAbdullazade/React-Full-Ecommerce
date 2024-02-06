import React, { useEffect, useState } from "react";
import { GET_ALL_BRANDS, UPDATE_BRANDS } from "../../../services/Brands";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Space, Typography, Upload } from "antd";

const UpdateBrands = () => {
  const [brand, setBrand] = useState({ name: "", image: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  const GET_DATA_FROM_STORAGE = () => {
    setBrand({
      name: localStorage.getItem("brandName"),
      image: localStorage.getItem("brandImage"),
      id: localStorage.getItem("brandId"),
    });
    GET_ALL_BRANDS().then(({ data }) => {
      console.log(data);
    });
  };
  useEffect(() => {
    GET_DATA_FROM_STORAGE();
  }, []);

  const handleFileChange = (e) => {
    e.preventDefault();
    let files = e.target.files;
    let newImages = [...brand.image];
    if (files) {
      Array.from(files).forEach((file) => {
        let reader = new FileReader();
        reader.addEventListener("load", (e) => {
          newImages.push(e.target.result);
          setBrand({ ...brand, image: newImages });
        });
        reader.readAsDataURL(file);
      });
    }
  };
  const handleSubmit = () => {
    UPDATE_BRANDS(id, brand)
      .then(({ data }) => {
        setBrand(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // navigate("/admin/all-brands");
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
            <input
              className="w-full  border my-2.5"
              type="file"
              name="file"
              multiple
              onChange={handleFileChange}
            />
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

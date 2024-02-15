import React, { useEffect, useRef, useState } from "react";
import { CREATE_NEW_BRAND } from "../../../services/Brands";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Image, Input, Typography, Upload } from "antd";
import { MdFileUpload } from "react-icons/md";

const CreateBrand = () => {
  const [brand, setBrand] = useState({ name: "", image: "" }); // STATE
  const navigate = useNavigate(); // NAVIGATE

  // ===> Post Brands To Server <===
  const handleSubmit = () => {
    CREATE_NEW_BRAND(brand)
      .then(({ data }) => {
        setBrand(data);
        navigate("/admin/all-brands");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // ===> CONVERT BASE 64 FILE TO IMAGE <===
  const handleFileChange = (e) => {
    const files = e.target.files[0];
    if (files) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setBrand({ ...brand, image: e.target.result });
      };
      reader.readAsDataURL(files);
    }
  };

  return (
    <div className=" form-content p-5  border w-96 h-96 min-w-[800px] my-5 mx-10">
      <Typography.Title level={3} type="success" className="text-center ">
        Create Brand
      </Typography.Title>
      <Form onFinish={handleSubmit}>
        <Form.Item name=" File">
          <div className="file-upload-section">
            <input
              id="file"
              type="file"
              name="file"
              onChange={handleFileChange}
              multiple
              className="opacity-0"
            />
            <Button>
              <div className="flex justify-center items-center gap-2.5 ">
                <MdFileUpload size={20} fill="red" />
                <label htmlFor="file" className="w-full cursor-pointer">
                  File Uploader
                </label>
              </div>
            </Button>
          </div>
        </Form.Item>

        <Form.Item>
          <Input
            type="text"
            name="brandName"
            value={brand.name}
            placeholder="type name"
            onChange={(e) => setBrand({ ...brand, name: e.target.value })}
          />
        </Form.Item>
        <div className="image-area flex gap-5 items-center">
          {brand.image && <Image width={120} height={120} src={brand.image} />}
          <Button disabled={!brand.image} onClick={() => setBrand({ image: "" })}>Delete Image</Button>
        </div>
        <Button className="block w-full my-5" htmlType="submit">
          Add Brand
        </Button>
      </Form>
    </div>
  );
};

export default CreateBrand;

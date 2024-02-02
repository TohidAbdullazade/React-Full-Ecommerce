import React, { useState } from "react";
import { CREATE_NEW_BRAND } from "../../../services/Brands";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography, Upload } from "antd";



const CreateBrand = () => {
  const [brand, setBrand] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ===> Convert File to Base64 Format <===
  const handleReq = (fileList) => {
    const files = fileList.file;
    const fileReader = new FileReader();
    setLoading(true);
    fileReader.onload = (e) => {
      setBrand({ image: e.target.result });
      setLoading(false);
    };
    fileReader.readAsDataURL(files);
  };
  // ===> Post Brands To Server <===
  const handleSubmit = () => {
    setLoading(true);
    CREATE_NEW_BRAND(brand, {
      onUploadProgress: (e) => {
        console.log(e);
      },
    })
      .then(({ data }) => {
        setBrand(data);
        setLoading(false);
        navigate("/admin/all-brands");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className=" form-content p-5 border  w-96 h-96 min-w-[800px] my-5 mx-10">
      <Typography.Title level={3} type="success" className="text-center border" >Create Brand</Typography.Title>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name=" File"
         
        >
          <Upload.Dragger
            fileList={[
              {
                uid: "1",
                name: "brand-image",
                status: "done",
                url: brand.image,
              },
            ]}
            listType="picture"
            accept="/png,jpg,jpeg,webp,avif,svg"
            customRequest={handleReq}
            progress={{
              strokeColor: {
                "0%": "#f0f",
                "100%": "#ff0",
              },
              size: "default",
              status:"success"
            }}
          >
            <Button loading={loading}>Upload File</Button>
          </Upload.Dragger>
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
        <Button htmlType="submit">Add Brand</Button>
      </Form>
    </div>
  );
};

export default CreateBrand;

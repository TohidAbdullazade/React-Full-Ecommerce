import React, { useState } from "react";
import { CREATE_NEW_PRODUCT } from "../../../services/Product";
import { useNavigate } from "react-router-dom";
import { Button, Form, Image, Input, Typography } from "antd";

const CreateProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState({
    title: "",
    description: "",
    salePrice: 0,
    productPrice: 0,
    brandId: Math.random(),
    stock: 0,
    isPublish: true,
    images: [],
  });

  const handleChange = (e) => {
    setProducts({ ...products, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const newImages = [...products.images];
    if (files) {
      Array.from(files).forEach((file) => {
        let reader = new FileReader();
        reader.addEventListener("load", (e) => {
          newImages.push(e.target.result);
          setProducts({ ...products, images: newImages });
        });
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = () => {
    CREATE_NEW_PRODUCT(products).then(({ data }) => {
      setProducts(data);
      navigate("/admin/all-products");
    });
    //  navigate("/admin/all-products");
  };
  // const handleReq = (fileList) => {
  //   const file = fileList.file;

  //   const imgArr = [];
  //   const reader = new FileReader();
  //   reader.addEventListener("load", (e) => {
  //     imgArr.push(e.target.result);
  //     setProducts({ ...products, images: imgArr });
  //   });
  //   reader.readAsDataURL(file);
  // };
  return (
    <>
      <div className="form-area h-screen w-screen flex items-start px-10">
        <div className="form-content  border my-5 bg-gray-50 p-2.5  rounded-md">
          <Typography.Title level={2} className="text-center">
            Create Product
          </Typography.Title>
          <Form
            onFinish={handleSubmit}
            labelCol={{ span: 24 }}
            onSubmit={handleSubmit}
            autoComplete="off"
            className="form-section grid grid-cols-3 gap-5"
          >
            <Form.Item
              label="Title"
              name={"title"}
              rules={[
                {
                  required: true,
                },

                { whitespace: true },
              ]}
              hasFeedback
            >
              <Input
                name="title"
                className="w-full "
                value={products.title}
                onChange={handleChange}
                placeholder="Type Title..."
              />
            </Form.Item>

            <Form.Item
              label="Description  "
              name={"description"}
              rules={[
                {
                  required: true,
                },
                {
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input
                name="description"
                placeholder="Type Description..."
                value={products.description}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              label="SalePrice  "
              name={"salePrice"}
              rules={[
                {
                  required: true,
                },
                {
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input
                name="salePrice"
                placeholder="Type SalePrice..."
                value={products.salePrice}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              label="ProductPrice  "
              name={"ProductPrice"}
              rules={[
                {
                  required: true,
                },
                {
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input
                name="productPrice"
                placeholder="Type ProductPrice..."
                value={products.productPrice}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item
              label="Stock  "
              name={"stock"}
              rules={[
                {
                  required: true,
                },
                {
                  whitespace: true,
                },
              ]}
              hasFeedback
            >
              <Input
                name="stock"
                placeholder="Type Stock..."
                value={products.stock}
                onChange={handleChange}
              />
            </Form.Item>
            <div className="btn_container flex h-full items-center mt-1.5 ">
              <Button
                type="text"
                htmlType="submit"
                className="bg-blue-500 text-white w-full"
              >
                Add Product
              </Button>
            </div>
            <div>
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                multiple
                aria-invalid="false"
              />
            </div>

              <div className="flex gap-2.5 border">
              {products.images.map((image, index) => (
                <Image width={100} height={100} key={index} src={image} />
              ))}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateProducts;

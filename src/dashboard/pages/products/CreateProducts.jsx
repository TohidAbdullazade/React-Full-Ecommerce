import React, { useState } from "react";
import { CREATE_NEW_PRODUCT } from "../../../services/Product";
import { useNavigate } from "react-router-dom";
import { Button, Form, Image, Input, List, Typography, message } from "antd";
import { MdFileUpload } from "react-icons/md";

const CreateProducts = () => {
  const navigate = useNavigate(); // NAVIGATE

  const [products, setProducts] = useState({ // STATE
    title: "",
    description: "",
    salePrice: 0,
    productPrice: 0,
    brandId: Math.random(),
    stock: 0,
    isPublish: true,
    images: [],
  });

// ===> HANDLE THE ONCHANGE EVENT <===
  const handleChange = (e) => {
    setProducts({ ...products, [e.target.name]: e.target.value });
  };

  // ===> CONVERT BASE 64 FILE TO IMAGE <===
  const handleFileChange = (e) => {
    const files = e.target.files;
    const newImages = [...products.images];
    if (files) {
      Array.from(files).forEach((file) => {
        if (newImages.length >= 4) {
          message.error("Only 4 Images Allowed!", 2);
          return;
        } else {
          let reader = new FileReader();
          reader.addEventListener("load", (e) => {
            newImages.push(e.target.result);
            setProducts({ ...products, images: newImages });
          });
          reader.readAsDataURL(file);
        }
      });
    }
  };
  // ===> CREATE AN NEW PRODUCT <===
  const handleSubmit = () => {
    CREATE_NEW_PRODUCT(products).then(({ data }) => {
      setProducts(data);
      navigate("/admin/all-products");
    });
  };
  // ===> DELETE THE IMAGE <===
  const handleDeleteImage = (index) => {
    const newImages = [...products.images];
    newImages.splice(index, 1);
    setProducts({ ...products, images: newImages });
  };

  return (
    <>
      <div className="form-area  flex items-start px-10">
        <div className="form-content min-w-[1000px] border my-5 bg-gray-50 p-2.5   rounded-md">
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
            <div className="file-upload-section flex flex-1 gap-52 items-center  ">
              <Button>
                <div className="flex justify-center items-center gap-2.5 ">
                  <MdFileUpload size={20} fill="red" />
                  <label htmlFor="file" className="w-full cursor-pointer">
                    File Uploader
                  </label>
                </div>
              </Button>
              <input
                id="file"
                type="file"
                name="file"
                onChange={handleFileChange}
                multiple
                className="opacity-0"
              />
              <div className="image-section ">
                <List bordered dataSource={products?.images}>
                  {products.images.map((item, index) => (
                    <List.Item key={index}>
                      <Image src={item} width={100} />
                      <Button
                        type="text"
                        onClick={() => handleDeleteImage(index)}
                      >
                        Delete
                      </Button>
                    </List.Item>
                  ))}
                </List>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateProducts;
{
  /* <input
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
            <div className="grid grid-cols-2  gap-2.5   ">
              {products.images.map((image, index) => (
                <span key={index}>
                  <Image
                    className="cursor-pointer hover:opacity-40 "
                    width={150}
                    height={100}
                    key={index}
                    src={image}
                  />
                  <div>
                    <Button
                      type="default"
                      className="my-1"
                      htmlType="button"
                      onClick={() => handleDeleteImage(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </span>
              ))} */
}

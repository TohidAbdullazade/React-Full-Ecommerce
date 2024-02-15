import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {  GET_SINGLE_PRODUCTS_FOR_SITE, UPDATE_PRODUCTS } from "../../../services/Product";
import { Button, Spin, Typography, Image, message, List } from "antd";
import { MdFileUpload } from "react-icons/md";

const UpdateProduct = () => {
  const { id } = useParams(); // PARAMS
  const navigate = useNavigate(); // NAVIGATE
  const [loading, setLoading] = useState(false); // STATE

  const [products, setProducts] = useState({ // STATE
    title: "",
    description: "",
    salePrice: 0,
    productPrice: 0,
    brandId: 0,
    stock: 0,
    isPublish: true,
    images: [],
  });
  // ===> HANDLE THE ONCHANGE EVENT <===
  const handleChange = (e) => {
    setProducts({ ...products, [e.target.name]: e.target.value });
  };

  // ===> FETCH DATA FROM SERVER <===
  const GET_DATA_FROM_SERVER = () => {
    setLoading(true);
    GET_SINGLE_PRODUCTS_FOR_SITE(id)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    GET_DATA_FROM_SERVER();
  }, []);

  // ===> CONVERT BASE 64 FILE IN TO IMAGE <=== //
  const handleFileChange = (e) => {
    e.preventDefault();
    const files = e.target.files;
    const newImages = [...products.images];
    if (files) {
      console.log(files);
      Array.from(files).forEach((file) => {
        console.log(file);
        if (newImages.length >= 4) {
          message.error("Only 4 Images Allowed!", 2);
          return;
        } else {
          let reader = new FileReader();
          reader.onload = () => {
            newImages.push(reader.result);
            setProducts({ ...products, images: newImages });
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  // ===> MAKE A POST REQUEST TO THE SERVER AND UPDATE THE PRODUCTS <===
  const handleSubmit = (e) => {
    UPDATE_PRODUCTS(id, products).then(({ data }) => {
      setProducts(data);
      navigate("/admin/all-products");
    });

    e.preventDefault();
  };
  
  // ===> DELETE THE CURRENT IMAGE <===
  const handleDeleteImage = (index) => {
    let newImages = [...products.images];
    newImages.splice(index, 1);
    setProducts({ ...products, images: newImages });
  };

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center items-center h-full ">
          <Spin spinning />
        </div>
      ) : (
        <div className="form-area  flex  items-start  px-10">
          <div className="form-content  border my-5 bg-gray-50 p-2.5  rounded-md">
            <Typography.Title level={2} className="text-center">
              Update Product
            </Typography.Title>
            <form
              onSubmit={handleSubmit}
              autoComplete="on"
              className="form-section grid grid-cols-3 gap-5"
            >
              <input
                name="title"
                className="w-full p-1 px-2.5 rounded-md "
                value={products.title}
                onChange={handleChange}
                placeholder="Type Title..."
              />

              <input
                name="description"
                placeholder="Type Description..."
                value={products.description}
                onChange={handleChange}
                className="w-full p-1 px-2.5 rounded-md "
              />

              <input
                name="salePrice"
                placeholder="Type SalePrice..."
                value={products.salePrice}
                onChange={handleChange}
                className="w-full p-1 px-2.5 rounded-md "
              />

              <input
                name="productPrice"
                placeholder="Type ProductPrice..."
                value={products.productPrice}
                onChange={handleChange}
                className="w-full p-1 px-2.5 rounded-md "
              />

              <input
                name="stock"
                placeholder="Type Stock..."
                value={products.stock}
                onChange={handleChange}
                className="w-full p-1 px-2.5 rounded-md "
              />

              <div className="btn_container flex h-full items-center mt-1.5 ">
                <Button
                  type="text"
                  htmlType="submit"
                  className="bg-blue-500 text-white w-full"
                >
                  Update Product
                </Button>
              </div>
              <div>
                <input
                  multiple
                  id="file"
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="opacity-0"
                />
                <Button>
                  <div className="flex justify-center  items-center gap-2.5 ">
                    <MdFileUpload size={20} fill="red" />
                    <label htmlFor="file" className="w-full cursor-pointer">
                      File Uploader
                    </label>
                  </div>
                </Button>
              </div>
              {products.images && (
                <>
                  <List bordered>
                    <h1 className="text-center text-2xl">File Uploader</h1>
                    {products.images.map((img, index) => (
                      <List.Item key={index}>
                        {typeof img === "object" ? (
                          <Image src={img.url} width={50} height={50} />
                        ) : (
                          <Image src={img} width={50} height={50} />
                        )}

                        <Button
                          disabled={!products.images}
                          type="default"
                          className="my-1"
                          htmlType="button"
                          onClick={() => handleDeleteImage(index)}
                        >
                          Delete
                        </Button>
                      </List.Item>
                    ))}
                  </List>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;

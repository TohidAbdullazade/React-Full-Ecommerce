import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_SINGLE_PRODUCT, UPDATE_PRODUCTS } from "../../../services/Product";
import { Button, Progress, Spin, Typography, Input, Image } from "antd";

const UpdateProduct = () => {
  const { id, } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState({
    title: "",
    description: "",
    salePrice: 0,
    productPrice: 0,
    brandId: 0,
    stock: 0,
    isPublish: true,
    images: [],
  });
  const handleChange = (e) => {
    setProducts({ ...products, [e.target.name]: e.target.value });
  };

  const GET_DATA_FROM_SERVER = () => {
    setLoading(true);
    GET_SINGLE_PRODUCT(id)
      .then((res) => {
       setProducts(res.data)
       console.log(res.data)
       setLoading(false)
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    GET_DATA_FROM_SERVER();
  }, []);

  const handleFileChange = (e) => {
    e.preventDefault();
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

  const handleSubmit = (e) => {
    UPDATE_PRODUCTS(id, products).then(({ data }) => {
      setProducts(data);
      navigate("/admin/all-products");
    });

    e.preventDefault();
  };

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center items-center h-full ">
          <Spin spinning />
        </div>
      ) : (
        <div className="form-area h-screen w-screen flex  items-start  px-10">
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
                  Add Product
                </Button>
              </div>
              <div>
                <input
                  className="w-full  border my-2.5"
                  type="file"
                  name="file"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
            </form>
            {/* {products.images.length >= 0 && (
              <div className="flex gap-2.5">
                {products.images.map((img, i) => (
                  <img
                    key={i}
                    src={img.url ? img.url : "Not Image"}
                    width={150}
                  />
                ))}
              </div>
            )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;

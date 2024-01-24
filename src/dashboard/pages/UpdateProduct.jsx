import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_ALL_PRODUCTS, UPDATE_PRODUCTS } from "../../services/Product";

const UpdateProduct = () => {
  const navigate = useNavigate();
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



  const GET_DATA_FROM_STORAGE = () => {
    setProducts({
      brandId: localStorage.getItem("productId"),
      title: localStorage.getItem("productTitle"),
      description: localStorage.getItem("productdesc"),
      salePrice: localStorage.getItem("productSalePrice"),
      productPrice: localStorage.getItem("productPrice"),
      stock: localStorage.getItem("productStock"),
    });
  };
  useEffect(() => {
    GET_DATA_FROM_STORAGE();
  }, []);

  const handleFileChange = (e) => {
    const files = e.target.files[0];
    const imgArr = [];

    const reader = new FileReader();
    reader.onload = (e) => {
      imgArr.push(e.target.result);
      setProducts({ ...products, images: imgArr });
    };
    reader.readAsDataURL(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UPDATE_PRODUCTS(products.brandId, products)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    navigate("/admin/all-products");
  };

  return (
    <>
      <div>
        <form>
          <label>Product Title :</label>
          <input
            type="text"
            name="title"
            value={products.title}
            onChange={handleChange}
          />

          <label>Product description :</label>
          <input
            type="text"
            name="description"
            value={products.description}
            onChange={handleChange}
          />
          <label>Product Sale Price :</label>
          <input
            type="text"
            name="salePrice"
            value={products.salePrice}
            onChange={handleChange}
          />
          <label>Product Price :</label>
          <input
            type="text"
            name="productPrice"
            value={products.productPrice}
            onChange={handleChange}
          />

          <label>Product Stock :</label>
          <input
            type="text"
            name="stock"
            value={products.stock}
            onChange={handleChange}
          />
          {/* <label htmlFor="">Is Publish</label>
          <input
            type="checkbox"
            checked={products.isPublish}
            onChange={handlePublishChange}
          /> */}

          <label>Product Image :</label>
          <input type="file" name="image" onChange={handleFileChange} />
          <button type="submit" onClick={handleSubmit}>
            Add
          </button>
        </form>
        <img src={products.images} />
      </div>
    </>
  );
};

export default UpdateProduct;

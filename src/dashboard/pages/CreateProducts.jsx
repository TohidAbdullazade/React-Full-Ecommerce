import React, { useState } from "react";
import { CREATE_NEW_PRODUCT } from "../../services/Product";
import { useNavigate } from "react-router-dom";

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
    CREATE_NEW_PRODUCT(products).then(({ data }) => {
      setProducts(data);
      console.log(data);
    });
    //  navigate("/admin/all-products")
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Add</button>
        </form>
        <img src={products.images} />
      </div>
    </>
  );
};

export default CreateProducts;

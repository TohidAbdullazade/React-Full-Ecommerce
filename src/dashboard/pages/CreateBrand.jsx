import React, { useState } from "react";
import { CREATE_NEW_BRAND } from "../../services/Brands";
//import { Button, Upload } from "antd";

const CreateBrand = () => {
  const [brand, setBrand] = useState({ name: "", image: "" });

  // ===> Convert File to Base64 Format <===
  const handleFileChange = (e) => {
    const files = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setBrand({ ...brand, image: e.target.result });
    };
    fileReader.readAsDataURL(files);
  };
  // ===> Post Brands To Server <===
  const handleSubmit = (e) => {
    e.preventDefault();
    CREATE_NEW_BRAND(brand)
      .then(({ data }) => {
        setBrand(data);
        
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="fileInput" onChange={handleFileChange} />
        {/* <Upload onChange={handleFileChange}>
          <Button>Upload File</Button>
        </Upload> */}
        <hr />
        <input
          type="text"
          name="brandName"
          value={brand.name}
          placeholder="type name"
          onChange={(e) => setBrand({ ...brand, name: e.target.value })}
        />
        <button type="submit">add</button>
      </form>
      <img src={brand.image} />
    </div>
  );
};

export default CreateBrand;

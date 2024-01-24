import React, { useEffect, useState } from "react";
import { UPDATE_BRANDS } from "../../services/Brands";
import { useNavigate } from "react-router-dom";


const UpdateBrands = () => {
  const [brand, setBrand] = useState({ name: "", image: "", id: 0 });
  const navigate = useNavigate();

  const GET_DATA_FROM_STORAGE = () => {
    setBrand({
      name: localStorage.getItem("brandName"),
      image: localStorage.getItem("brandImage"),
      id: localStorage.getItem("brandId"),
    });
  };
  useEffect(() => {
    GET_DATA_FROM_STORAGE();
  }, []);

  const handleFileChange = (e) => {
    const files = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setBrand({ ...brand, image: e.target.result });
    };
    fileReader.readAsDataURL(files);
  };

  const handleSubmit = () => {
    UPDATE_BRANDS(brand.id, brand)
      .then(({ data }) => {
        setBrand(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    navigate("/admin/all-brands");
  };

  return (
    <div>
      <form>
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
        <button type="submit" onClick={handleSubmit}>
          add
        </button>
      </form>
      <img src={brand.image} />
    </div>
  );
};

export default UpdateBrands;

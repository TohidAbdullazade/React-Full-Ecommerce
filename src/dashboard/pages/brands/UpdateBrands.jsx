import React, { useEffect, useState } from "react";
import { GET_ALL_BRANDS, UPDATE_BRANDS } from "../../../services/Brands";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Form,
  Image,
  Input,
  List,
  Typography,
} from "antd";
import { MdFileUpload } from "react-icons/md";

const UpdateBrands = () => {
  const [brand, setBrand] = useState({ name: "", image: "" }); // STATE
  const navigate = useNavigate(); // NAVIGATE
  const { id } = useParams(); // PARAMS

  // ===> GET DATAS FROM LOCALE STORAGE <===
  const GET_DATA_FROM_STORAGE = () => {
    setBrand({
      name: localStorage.getItem("brandName"),
      image: localStorage.getItem("brandImage"),
      id: localStorage.getItem("brandId"),
    });
    GET_ALL_BRANDS().then(({ data }) => {
      console.log(data);
    });
  };
  useEffect(() => {
    GET_DATA_FROM_STORAGE();
  }, []);

  // ===> CONVERT BASE 64 FILE TO IMAGE <===
  const handleFileChange = (e) => {
    e.preventDefault();
    let files = e.target.files[0];
    if (files) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setBrand({ ...brand, image: e.target.result });
      };
      reader.readAsDataURL(files);
    }
  };
  // ===> MAKE A POST REQUEST TO THE SERVER AND UPDATE THE BRANDS <===
  const handleSubmit = () => {
    UPDATE_BRANDS(id, brand)
      .then(({ data }) => {
        setBrand(data);
        localStorage.setItem("brand", JSON.stringify(data));
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
       navigate("/admin/all-brands");
  };

  return (
    <div className="min-w-[800px] border p-5 m-10 ">
      <Form onFinish={handleSubmit}>
        <Typography.Title level={3} className="text-center">
          Update Brands
        </Typography.Title>
        <Form.Item>
          <Input
            type="text"
            name="brandName"
            value={brand.name}
            placeholder="type name"
            onChange={(e) => setBrand({ ...brand, name: e.target.value })}
          />
        </Form.Item>
        <Form.Item>
          <div className="flex flex-1  items-center">
            <Button>
              <div className="flex justify-center items-center gap-2.5 ">
                <MdFileUpload size={20} fill="red" />
                <label htmlFor="file" className="w-full cursor-pointer">
                  File Uploader
                </label>
              </div>
            </Button>
            <input
              type="file"
              id="file"
              name="file-input"
              className="opacity-0"
              onChange={handleFileChange}
            />
            <div className="image-section flex-[4]">
              <List
                bordered
                size="small"
                dataSource={brand.image}
                className="relative "
              >
                <div className={`${!brand.image ? "h-10" : ""}`} >
                <List.Item>
                  {brand.image && <Image width={120} src={brand.image} />}
                </List.Item>
                </div>
                <Button
                  className={`${
                    brand.image
                      ? "absolute top-10 right-2  "
                      : "absolute top-1 right-1 "
                  }`}
                  disabled={!brand.image}
                  onClick={() => setBrand({ image: "" })}
                >
                  Delete Image
                </Button>
              </List>
            </div>
          </div>
        </Form.Item>

        <Button htmlType="submit" className="my-2.5 block w-full">
          Update Brand
        </Button>
      </Form>
    </div>
  );
};

export default UpdateBrands;

import React, { useEffect, useState } from "react";
import { DELETE_BRANDS, GET_ALL_BRANDS } from "../../services/Brands";
import { useNavigate } from "react-router-dom";
import { Avatar } from "antd";

const AllBrands = () => {
  const [data, setData] = useState([]); // STATE
  const navigate = useNavigate(); // NAVIGATION

  // ===> FETCH ALL BRANDS FROM SERVER <===
  const getDatas = () => {
    GET_ALL_BRANDS().then(({ data }) => {
      setData(data);
      console.log(data);
    });
  };
  useEffect(() => {
    getDatas();
  }, []);

  // ===> DELETE BRANDS <===
  const deleteItem = (id) => {
    DELETE_BRANDS(id)
      .then(() => {
        getDatas();
      })
      .catch((err) => console.log(err.message));
  };
  //  ===> ADD TO STORAGE  || NAVIGATE TO THE UPDATE PAGE <===
  const SET_TO_STORAGE = (id, name, imgUrl) => {
    localStorage.setItem("brandName", name);
    localStorage.setItem("brandId", id);
    localStorage.setItem("brandImage", imgUrl);
    navigate("/admin/update-brands");
  };
  return (
    <>
      <div>
        <h1>Product Counts : {data.length}</h1>
        <table>
          <thead>
            <tr>
              <th className="border ">Product Id</th>
              <th className="border ">Product Name</th>
              <th className="border ">Product Image</th>
              <th className="border " colSpan={2}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td className="border">{item._id}</td>
                <td className="border">{item.name}</td>
                <td className="border">
                  {/* <Avatar src={item?.image.url}></Avatar>  */}
                </td>
                <td className="border">
                  <button onClick={() => deleteItem(item._id)}>Delete</button>
                </td>
                <td className="border">
                  <button
                    onClick={() =>
                      SET_TO_STORAGE(item._id, item.name, item.image.url)
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllBrands;

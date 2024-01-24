import React, { useEffect, useState } from "react";
import { DELETE_PRODUCTS, GET_ALL_PRODUCTS } from "../../services/Product";
import CustomPagenation from "../components/CustomPagenation";
import { useNavigate } from "react-router-dom";


const AllProducts = () => {
  const [data, setData] = useState([]);
  const [customTotalCount, setCustomTotalCount] = useState(0);

  const navigate = useNavigate();
  // ===> PAGENATION <===
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage)
  const postPerPage = 10;

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = data.slice(firstPostIndex, lastPostIndex);

  const getData = () => {
    GET_ALL_PRODUCTS(currentPage,postPerPage)
    .then(({data}) => {
      setData(data.product);
      setCustomTotalCount(data.totalCount);
      const customTotalCount = data.totalCount
      console.log(customTotalCount)
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getData()
  },[currentPage, postPerPage])


  const deleteProduct = (id) => {
    DELETE_PRODUCTS(id)
      .then(() => {
        getData();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const updateProduct = (id, title, desc, salePrice, productPrice, stock) => {
    localStorage.setItem("productId", id);
    localStorage.setItem("productTitle", title);
    localStorage.setItem("productdesc", desc);
    localStorage.setItem("productSalePrice", salePrice);
    localStorage.setItem("productPrice", productPrice);
    localStorage.setItem("productStock", stock);
    navigate("/admin/update-products")
  };
  return (
    <>
      <div>
        <table className="border">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Sale Price</th>
              <th>Product Price</th>
              <th>Stock</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPost.map((item) => (
              <tr key={item._id}>
                <td className="border">{item.title}</td>
                <td className="border">{item.description}</td>
                <td className="border">{item.salePrice}</td>
                <td className="border">{item.productPrice}</td>
                <td className="border">{item.stock}</td>
                <td className="border"><img height={80} width={80} src={item.images[0].url}/></td>
                <td className="border">
                  <button
                    onClick={() =>
                      updateProduct(
                        item._id,
                        item.title,
                        item.description,
                        item.salePrice,
                        item.productPrice,
                        item.stock
                      )
                    }
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteProduct(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <CustomPagenation
            totalPost={customTotalCount}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};
export default AllProducts;

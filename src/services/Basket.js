import { API } from "../config/Axios";

export const SET_PRODUCT_TO_BASKET = async (data) => {
  let res = await API.post(`site/basket`,data);
  console.log(res.data);
  return res.data;
};

import { API } from "../config/Axios";

// =======> PRODUCTS FOR DASHBOARD <======= //

// ===> CREATE NEW PRODUCT <===
export const CREATE_NEW_PRODUCT = async (items) => {
  let res = await API.post("dashboard/products", items);
  return res.data;
};

// ===> GET ALL PRODUCTS <===
export const GET_ALL_PRODUCTS = async (currentPage, postPerPage) => {
  let res = await API.get(
    `dashboard/products?page=${currentPage}&perPage=${postPerPage}`
  );
  console.log(res.data);
  return res.data;
};
export const GET_SINGLE_PRODUCT = async (id) => {
  let res = await API.get(`dashboard/products?brandId=${id}`);
  return res.data;
};
// ===> DELETE  PRODUCTS <===
export const DELETE_PRODUCTS = async (id) => {
  let res = await API.delete(`dashboard/products/${id}`);
  return res.data;
};

// ===> UPDATE  PRODUCT <===
export const UPDATE_PRODUCTS = async (id,data ) => {
  let res = await API.put(`dashboard/products/${id}`,data);
  return res.data;
};
// ===> GET ALL PRODUCTS FOR SITE <===
export const GET_ALL_PRODUCTS_FROM_SITE = async () => {
  let res = await API.get(`site/products`);
  return res.data;
};
// ===> GET SINGLE PRODUCTS FOR SITE <===
export const GET_SINGLE_PRODUCTS_FOR_SITE = async (id) => {
  let res = await API.get(`site/products/${id}`);
  return res.data;
};

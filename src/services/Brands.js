import { API } from "../config/Axios";

// ===> CREATE NEW BRAND <===
export const CREATE_NEW_BRAND = async (brandItem) => {
  let res = await API.post("dashboard/brands", brandItem);
  return res.data;
};
// ===> GET ALL BRANDS <===
export const GET_ALL_BRANDS = async () => {
  let res = await API.get("dashboard/brands");
  return res.data;
};


// ===> DELETE BRANDS <===
export const DELETE_BRANDS = async (id) => {
  let res = await API.delete(`dashboard/brands/${id}`);
  return res.data;
};
// ===> UPDATE BRANDS <===
export const UPDATE_BRANDS = async (id,brand) => {
  let res = await API.put(`dashboard/brands/${id}`,brand);
  return res.data;
};

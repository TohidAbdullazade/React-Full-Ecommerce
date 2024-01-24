import { API } from "../config/Axios";

// ===> Login as SuperAdmin in Dashboard <===
export const Login = async (userData) => {
  let res = await API.post("login", userData);
  return res.data;
};

// ===> Get SuperAdmin  Profile in Dashboard <===
export const getProfile = async () => {
  let res = await API.get("profile");
  return res.data;
};
// ===> Register as Admin in Dashboard <===
export const Register = async (registerDatas) => {
  let res = await API.post("dashboard/register", registerDatas);
  console.log(res.data);
  return res.data;
};

// ===> Get all Admins in Dashboard <===
export const GET_ALL_ADMINS = async () => {
  let res = await API.get("dashboard/users");
  return res.data;
};

// ===> Delete Admins in Dashboard <===
export const deleteAdmin = async (id) => {
  let res = await API.delete(`dashboard/users/${id}`);
  return res.data;
};

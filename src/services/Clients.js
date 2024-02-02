import {SITE_API } from "../config/Axios";
// ===> CREATE A NEW CLIENT FOR SITE <====
 
export const CREATE_CLIENT = async (clienData) => {
  let res = await SITE_API.post("site/register", clienData);
  return res.data;
};


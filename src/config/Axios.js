import axios from "axios";

export const API = axios.create({
  baseURL:
    "https://frontend-api-dypw.onrender.com/api/895d975e-030a-43d5-90a4-6b5d7a911624/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
    

    
  },
});



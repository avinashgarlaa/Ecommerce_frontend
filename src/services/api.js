import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL ||
    "https://ecommerce-backend-aswj.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("shopverse_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
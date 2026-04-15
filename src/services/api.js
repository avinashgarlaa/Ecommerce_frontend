import axios from "axios";

const defaultBaseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://ecommerce-backend-aswj.onrender.com/api";

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL ||
    defaultBaseURL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("shopverse_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
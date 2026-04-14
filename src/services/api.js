import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce-backend-aswj.onrender.com/api",
});

export default API;
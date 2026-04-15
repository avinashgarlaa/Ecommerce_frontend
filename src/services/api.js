import axios from "axios";

const defaultBaseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://ecommerce-backend-aswj.onrender.com/api";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || defaultBaseURL,
  timeout: 15000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("shopverse_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const isAuthPath = ["/auth/login", "/auth/signup"].some((path) =>
      String(error?.config?.url || "").includes(path)
    );

    if (status === 401 && !isAuthPath) {
      localStorage.removeItem("shopverse_token");
      localStorage.removeItem("shopverse_user");
      sessionStorage.setItem("shopverse_session_expired", "1");

      if (window.location.pathname !== "/login") {
        window.location.assign("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default API;

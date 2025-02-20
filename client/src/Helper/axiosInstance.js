import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lms-server-6-9fwo.onrender.com/api/v1/",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("🚀 Request Sent to:", config.url);
  console.log("📡 Token Attached:", token ? `Bearer ${token}` : "No Token Found");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error("❌ Request Error:", error);
  return Promise.reject(error);
});

export default axiosInstance;

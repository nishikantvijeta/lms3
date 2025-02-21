import axios from "axios";


  const BASE_URL="https://lms-server-r3mf.onrender.com/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Ensures cookies are sent
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
// const axiosInstance = axios.create();

// axiosInstance.defaults.baseURL = BASE_URL;
// axiosInstance.defaults.withCredentials = true;

export default axiosInstance;

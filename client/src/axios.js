import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5100", // 👈 point to your backend
  withCredentials: true,
});

export default axiosInstance;

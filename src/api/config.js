import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://smoothback.onrender.com/api/",
});

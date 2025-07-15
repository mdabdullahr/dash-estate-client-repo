import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {

  // Request Interceptors
  axiosInstance.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("access-token")}`;
    return config;
  });
  

  return axiosInstance;
};

export default useAxiosSecure;

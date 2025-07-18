import axios from "axios";

const axiosPublicInstance = axios.create({
  baseURL: "https://real-estate-server-eosin.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublicInstance;
};

export default useAxiosPublic;

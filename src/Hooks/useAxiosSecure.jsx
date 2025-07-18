import axios from "axios";
import useAuth from "./useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "https://real-estate-server-eosin.vercel.app",
});

const useAxiosSecure = () => {
  const {logoutUser} = useAuth();
  // Request Interceptors
  axiosInstance.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem(
      "access-token"
    )}`;
    return config;
  });


  //  Response Interceptors
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.status === 401) {
        logoutUser()
          .then(() => {
            Swal.fire({
              title: "Logged Out for Unauthorized Access",
              icon: "warning",
              draggable: true,
            });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
      if (error.status === 403) {
        logoutUser()
          .then(() => {
            Swal.fire({
              title: "Logged Out for Forbidden Access",
              icon: "warning",
              draggable: true,
            });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    }
  );

  return axiosInstance;
};

export default useAxiosSecure;

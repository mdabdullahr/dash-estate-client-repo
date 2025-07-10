import { Navigate, useLocation } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";



const PrivateRoute = ({ children }) => {
  const { user, loader } = useAuth();
  const location = useLocation();

  if (loader) {
    return <Loading></Loading>
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/authLayout/login"></Navigate>;
};

export default PrivateRoute;

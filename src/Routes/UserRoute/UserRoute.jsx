import { Navigate, useLocation } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useUserRole from "../../Hooks/useUserRole";
import Loading from "../../Shared/Loading/Loading";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { user, loader } = useAuth();
  const { role, roleLoader } = useUserRole();

  if (loader || roleLoader) {
    return <Loading></Loading>;
  }

  if (!user || role !== "user") {
    return <Navigate state={location.pathname} to="/forbidden"></Navigate>;
  }

  return children;
};

export default AdminRoute;

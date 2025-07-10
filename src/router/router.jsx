import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import AllProperties from "../Pages/AllProperties/AllProperties";
import Login from "../Pages/AuthPage/Login/Login";
import Register from "../Pages/AuthPage/Register/Register";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import Home from "../Pages/HomePage/Home/Home";
import PropertyDetails from "../Pages/PropertyDetails/PropertyDetails";
import PrivateRoute from "../Routes/PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  // RootLayout Related Routes
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allProperties",
        element: (
          <PrivateRoute>
            <AllProperties></AllProperties>
          </PrivateRoute>
        ),
      },
      {
        path: "/propertyDetails",
        Component: PropertyDetails,
      },
    ],
  },

  // Dashboard Related Routes
  {
    path: "/dashboard",
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
    ],
  },

  // Authentication Related Routes
  {
    path: "/authLayout",
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);

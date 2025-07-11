import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import AllProperties from "../Pages/AllProperties/AllProperties";
import Login from "../Pages/AuthPage/Login/Login";
import Register from "../Pages/AuthPage/Register/Register";
// import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import Home from "../Pages/HomePage/Home/Home";
import PropertyDetails from "../Pages/PropertyDetails/PropertyDetails";
import PrivateRoute from "../Routes/PrivateRoute/PrivateRoute";
import Dashboard from "../Layouts/Dashboard";
import UserProfile from "../Pages/Dashboard/UserLik/UserProfile/UserProfile";
import Wishlist from "../Pages/Dashboard/UserLik/Wishlist/Wishlist";
import BoughtProperties from "../Pages/Dashboard/UserLik/BoughtProperties/BoughtProperties";
import MyReviews from "../Pages/Dashboard/UserLik/MyReviews/MyReviews";

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
  element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
  children: [
    {
      path: "profile", // this means "/dashboard"
      element: <UserProfile></UserProfile>
    },
    {
      path: "wishlist", // this becomes "/dashboard/wishlist"
      element: <Wishlist></Wishlist>,
    },
    {
      path: "bought", // "/dashboard/bought"
      element: <BoughtProperties />,
    },
    {
      path: "reviews", // "/dashboard/reviews"
      element: <MyReviews />,
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

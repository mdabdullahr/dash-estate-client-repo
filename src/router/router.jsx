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
import ErrorPage from "../components/ErrorPage/ErrorPage";
import AgentProfile from "../Pages/Dashboard/AgentLink/AgentProfile/AgentProfile";
import AddProperty from "../Pages/Dashboard/AgentLink/AddProperty/AddProperty";
import MyAdded from "../Pages/Dashboard/AgentLink/MyAdded/MyAdded";
import MySold from "../Pages/Dashboard/AgentLink/MySold/MySold";
import Requests from "../Pages/Dashboard/AgentLink/Requests/Requests";
import AdminProfile from "../Pages/Dashboard/AdminLink/AdminProfile/AdminProfile";
import ManageProperties from "../Pages/Dashboard/AdminLink/ManageProperties/ManageProperties";
import ManageUsers from "../Pages/Dashboard/AdminLink/ManageUsers/ManageUsers";
import ManageReviews from "../Pages/Dashboard/AdminLink/ManageReviews/ManageReviews";
import Advertise from "../Pages/Dashboard/AdminLink/Advertise/Advertise";

export const router = createBrowserRouter([
  // RootLayout Related Routes
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
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

    // USER RELATED CHILDREN
    {
      path: "profile",
      element: <UserProfile></UserProfile>
    },
    {
      path: "wishlist",
      element: <Wishlist></Wishlist>,
    },
    {
      path: "bought",
      element: <BoughtProperties />,
    },
    {
      path: "reviews",
      element: <MyReviews />,
    },

    // AGENT RELATED CHILDREN
    {
      path: "agentProfile",
      element: <AgentProfile></AgentProfile>
    },
    {
      path: "addProperty",
      element: <AddProperty></AddProperty>
    },
    {
      path: "myAdded",
      element: <MyAdded></MyAdded>
    },
    {
      path: "mySold",
      element: <MySold></MySold>
    },
    {
      path: "requests",
      element: <Requests></Requests>
    },

    // ADMIN RELATED CHILDREN
    {
      path: "adminProfile",
      element: <AdminProfile></AdminProfile>
    },
    {
      path: "manageProperties",
      element: <ManageProperties></ManageProperties>
    },
    {
      path: "manageUsers",
      element: <ManageUsers></ManageUsers>
    },
  {
    path: "manageReviews",
    element: <ManageReviews></ManageReviews>
  },
  {
    path:"advertise",
    element: <Advertise></Advertise>
  }
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

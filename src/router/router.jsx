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
// import MyAdded from "../Pages/Dashboard/AgentLink/MyAdded/MyAdded";
import MySold from "../Pages/Dashboard/AgentLink/MySold/MySold";
import Requests from "../Pages/Dashboard/AgentLink/Requests/Requests";
import AdminProfile from "../Pages/Dashboard/AdminLink/AdminProfile/AdminProfile";
import ManageProperties from "../Pages/Dashboard/AdminLink/ManageProperties/ManageProperties";
import ManageUsers from "../Pages/Dashboard/AdminLink/ManageUsers/ManageUsers";
import ManageReviews from "../Pages/Dashboard/AdminLink/ManageReviews/ManageReviews";
import Advertise from "../Pages/Dashboard/AdminLink/Advertise/Advertise";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoute from "../Routes/AdminRoute/AdminRoute";
import AgentRoute from "../Routes/AgentRoute/AgentRoute";
import UserRoute from "../Routes/UserRoute/UserRoute";
import MyAddedProperties from "../Pages/Dashboard/AgentLink/MyAddedProperties/MyAddedProperties";
import MakeOffer from "../Pages/Dashboard/UserLik/Wishlist/MakeOffer";
// import Payment from "../Pages/Dashboard/UserLik/BoughtProperties/Payment";
import PaymentPage from "../Pages/Dashboard/UserLik/BoughtProperties/PaymentPage";
import AboutUs from "../components/AboutUs/AboutUs";
// import UpdateProfile from "../Pages/Dashboard/UpdateProfile/updateProfile";

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
        path: "/propertyDetails/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails></PropertyDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/forbidden",
        Component: Forbidden,
      },
      {
        path: "/aboutUs",
        Component: AboutUs
      }
    ],
  },

  // Dashboard Related Routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // USER RELATED CHILDREN
      {
        path: "profile",
        element: (
          <UserRoute>
            <UserProfile></UserProfile>
          </UserRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <UserRoute>
            <Wishlist></Wishlist>
          </UserRoute>
        ),
      },
      {
        path: "bought",
        element: (
          <UserRoute>
            <BoughtProperties />
          </UserRoute>
        ),
      },
      {
        path: "reviews",
        element: (
          <UserRoute>
            <MyReviews />
          </UserRoute>
        ),
      },
      {
        path: "make-offer/:wishlistId",
        element: (
          <UserRoute>
            <MakeOffer></MakeOffer>
          </UserRoute>
        ),
      },
      {
        path: "payment/:offerId",
        element: (
          <UserRoute>
            <PaymentPage></PaymentPage>
          </UserRoute>
        ),
      },

      // AGENT RELATED CHILDREN
      {
        path: "agentProfile",
        element: (
          <AgentRoute>
            <AgentProfile></AgentProfile>
          </AgentRoute>
        ),
      },
      {
        path: "addProperty",
        element: (
          <AgentRoute>
            <AddProperty></AddProperty>
          </AgentRoute>
        ),
      },
      {
        path: "myAddedProperties",
        element: (
          <AgentRoute>
            <MyAddedProperties></MyAddedProperties>
          </AgentRoute>
        ),
      },
      {
        path: "mySold",
        element: (
          <AgentRoute>
            <MySold></MySold>
          </AgentRoute>
        ),
      },
      {
        path: "requests",
        element: (
          <AgentRoute>
            <Requests></Requests>
          </AgentRoute>
        ),
      },

      // ADMIN RELATED CHILDREN
      {
        path: "adminProfile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      {
        path: "manageProperties",
        element: (
          <AdminRoute>
            <ManageProperties></ManageProperties>
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manageReviews",
        element: (
          <AdminRoute>
            <ManageReviews></ManageReviews>
          </AdminRoute>
        ),
      },
      {
        path: "advertise",
        element: (
          <AdminRoute>
            <Advertise></Advertise>
          </AdminRoute>
        ),
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

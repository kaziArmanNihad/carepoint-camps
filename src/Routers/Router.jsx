import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import AvailableCamps from "../Pages/AvailableCamps/AvailableCamps";
import Register from "../Pages/Authtication/Register/Register";
import Login from "../Pages/Authtication/Login/Login";
import NotFound from "../Pages/NotFound/NotFound";
import CampDetails from "../Pages/CampDetails/CampDetails";
import Dashboard from "../Layout/Dashboard/Dashboard";
import UserRequiestedCamps from "../Pages/Dashboard/UserPages/UserRequiestedCamps/UserRequiestedCamps";
import UserAnalytics from "../Pages/Dashboard/UserPages/UserAnalytics/UserAnalytics";
import UserPaymentHistory from "../Pages/Dashboard/UserPages/UserPaymentHistory/UserPaymentHistory";
import ParticipantProfileUpdate from "../Pages/Dashboard/UserPages/Participant/ParticipantProfileUpdate";
import OrganizerProfile from "../Pages/Dashboard/AdminPages/OrganizerProfile/OrganizerProfile";
import AddACamp from "../Pages/Dashboard/AdminPages/AddACamp/AddACamp";
import ManageCamps from "../Pages/Dashboard/AdminPages/ManageCamps/ManageCamps";
import ManageRegisteredCamps from "../Pages/Dashboard/AdminPages/ManageRegisteredCamps/ManageRegisteredCamps";
import OrganizerProfileUpdate from "../Pages/Dashboard/AdminPages/OrganizerProfile/OrganizerProfileUpdate";
import UpdateManageCamps from "../Pages/Dashboard/AdminPages/ManageCamps/UpdateManageCamps";
import Payment from "../Pages/Dashboard/UserPages/Payments/Payment";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../Pages/Dashboard/AdminPages/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import DashboardInterface from "../Pages/Dashboard/DashboardInterface";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import ProfilePage from "../Pages/Dashboard/UserPages/Profile/Profile";
import ProfileUpdate from "../Pages/Dashboard/UserPages/Profile/ProfileUpdate";
import ParticipantInformations from "../Pages/Dashboard/UserPages/Participant/ParticipantInformations";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/availableCamps",
        element: <AvailableCamps />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/contactUs",
        element: <ContactUs />,
      },
      {
        path: "/campDetails/:id",
        element: (
          <PrivateRoute>
            <CampDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/dashboardInterface",
        element: (
          <PrivateRoute>
            <DashboardInterface />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: <ProfilePage />,
      },
      {
        path: "/dashboard/profileUpdate",
        element: <ProfileUpdate />,
      },
      {
        path: "/dashboard/userAnalytics",
        element: <UserAnalytics />,
      },
      {
        path: "/dashboard/ParticipantInformations",
        element: <ParticipantInformations />,
      },
      {
        path: "/dashboard/participantProfileUpdate/:id",
        element: <ParticipantProfileUpdate />,
      },
      {
        path: "/dashboard/userRequiestedCamps",
        element: <UserRequiestedCamps />,
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment />,
      },
      {
        path: "/dashboard/userPaymentHistory",
        element: <UserPaymentHistory />,
      },

      // Admin route
      {
        path: "/dashboard/organizerProfile",
        element: (
          <AdminRoute>
            <OrganizerProfile />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/organizerProfileUpdate",
        element: (
          <AdminRoute>
            <OrganizerProfileUpdate />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/AllUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addACamp",
        element: (
          <AdminRoute>
            <AddACamp />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageCamps",
        element: (
          <AdminRoute>
            <ManageCamps />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/updateManageCamps/:id",
        element: (
          <AdminRoute>
            <UpdateManageCamps />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageRegisteredCamps",
        element: (
          <AdminRoute>
            <ManageRegisteredCamps />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;

import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "../layouts/AppLayout";
import Error from "../pages/Error";
import Loading from "../pages/Loading";

// pages
import Home from "../pages/Home";
import Tours from "../pages/tours/Tours";
import Tour from "../pages/tours/tour/Tour";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

import Careers from "../pages/careers/Careers";
import LoginForm from "../pages/auth/LoginForm";
import SignupForm from "../pages/auth/SignupForm";

// accounts
import Settings from "../pages/accounts/Settings";

// user
import UserDashboard from "../pages/accounts/user/DashBoard";
import UsersBookings from "../pages/accounts/user/bookings/Bookings";
import UsersReviews from "../pages/accounts/user/reviews/Reviews";

// admin
import AdminDashBoard from "../pages/accounts/admin/Dashboard";
import Stats from "../pages/accounts/admin/Stats";
import Bookings from "../pages/accounts/admin/Bookings";
import Reviews from "../pages/accounts/admin/Reviews";

// guide
import GuideDashboard from "../pages/accounts/guide/Dashboard";

const router = createBrowserRouter([
  {
    Component: AppLayout,
    errorElement: <Error />,
    // loadingElement: <Loading />,
    HydrateFallback: Loading,
    children: [
      {
        path: "/",
        // loader: homeLoader,
        Component: Home,
      },
      {
        path: "/tours",
        children: [
          {
            index: true,
            Component: Tours,
          },
          {
            path: ":id",
            Component: Tour,
          },
        ],
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/user",
        Component: UserDashboard,
        children: [
          // user
          { index: true, Component: Settings },
          { path: "bookings", Component: UsersBookings },
          { path: "reviews", Component: UsersReviews },
        ],
      },

      // admin
      {
        path: "/admin",
        Component: AdminDashBoard,
        children: [
          { index: true, Component: Stats },
          { path: "settings", Component: Settings },
          { path: "bookings", Component: Bookings },
          { path: "reviews", Component: Reviews },
        ],
      },

      // guide
      {
        path: "/guide",
        Component: GuideDashboard,
        children: [
          // user
          { index: true, Component: Settings },
        ],
      },

      {
        path: "/careers",
        Component: Careers,
      },
      {
        path: "/login",
        Component: LoginForm,
      },
      {
        path: "/signUp",
        Component: SignupForm,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;

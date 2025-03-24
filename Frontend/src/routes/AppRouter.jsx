import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "../layouts/AppLayout";
import Error from "../pages/Error";
import Loading from "../pages/Loading";

// pages
import Home from "../pages/Home";
import Tours from "../pages/Tours";
import Tour from "../components/tours/tour/Tour";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

import Careers from "../components/careers/Careers";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

// accounts
import Settings from "../components/dashboard/accounts/Settings";

// user
import UserDashboard from "../components/dashboard/accounts/user/DashBoard";

// admin
import AdminDashBoard from "../components/dashboard/accounts/admin/Dashboard";
import Stats from "../components/dashboard/accounts/admin/Stats";
import Bookings from "../components/dashboard/accounts/admin/Bookings";
import BookingDetails from "../components/dashboard/accounts/admin/BookingDetails";
import AllTours from "../components/dashboard/accounts/admin/Tours";
import AddTour from "../components/dashboard/accounts/admin/AddForm";
import EditTour from "../components/dashboard/accounts/admin/EditTour";
import TourBookings from "../components/dashboard/accounts/admin/TourBookings";
import Reviews from "../components/dashboard/accounts/admin/Reviews";
import AllUsers from "../components/dashboard/accounts/admin/Users";
import FeedBacks from "../components/dashboard/accounts/admin/Feedbacks";
import AllPayments from "../components/dashboard/accounts/admin/Payments";
import AllGuides from "../components/dashboard/accounts/admin/Guides";
import JobPosts from "../components/dashboard/accounts/admin/JobPosts";

// guide
import GuideDashboard from "../components/dashboard/accounts/guide/Dashboard";

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

      //user
      {
        path: "/user",
        Component: UserDashboard,
        children: [
          // user
          { index: true, Component: Settings },
          { path: "bookings", Component: Bookings },
          { path: "reviews", Component: Reviews },
        ],
      },

      // admin
      {
        path: "/admin",
        Component: AdminDashBoard,
        children: [
          { index: true, Component: Stats },
          {
            path: "bookings",
            children: [
              { index: true, Component: Bookings },
              { path: ":id", Component: BookingDetails },
            ],
          },
          {
            path: "tours",
            children: [
              { index: true, Component: AllTours },
              {
                path: "bookings/:name",
                Component: TourBookings,
              },
              {
                path: "edit/:name",
                Component: EditTour,
              },
              {
                path: "add",
                Component: AddTour,
                // element: <AddTour />,
              },
            ],
          },

          { path: "reviews", Component: Reviews },
          { path: "users", Component: AllUsers },
          { path: "feedbacks", Component: FeedBacks },
          { path: "payments", Component: AllPayments },
          { path: "guides", Component: AllGuides },
          { path: "job-posts", Component: JobPosts },
          { path: "settings", Component: Settings },
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

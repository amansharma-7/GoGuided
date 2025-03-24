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
import UsersBookings from "../components/dashboard/accounts/user/bookings/Bookings";
import UsersReviews from "../components/dashboard/accounts/user/reviews/Reviews";

// admin
import AdminDashBoard from "../components/dashboard/accounts/admin/Dashboard";
import Stats from "../components/dashboard/accounts/admin/Stats";
import AllBookings from "../components/dashboard/accounts/admin/Bookings";
import AllTours from "../components/dashboard/accounts/admin/Tours";
import AllReviews from "../components/dashboard/accounts/admin/Reviews";
import AllUsers from "../components/dashboard/accounts/admin/Users";
import FeedBacks from "../components/dashboard/accounts/admin/Feedbacks";
import AllPayments from "../components/dashboard/accounts/admin/Payments";
import AllGuides from "../components/dashboard/accounts/admin/Guides";

// guide
import GuideDashboard from "../components/dashboard/accounts/guide/Dashboard";
import BookingDetails from "../components/dashboard/accounts/admin/BookingDetails";
import UserDetails from "../components/dashboard/accounts/admin/UserDetails";
import GuideDetails from "../components/dashboard/accounts/admin/GuideDetails";
import JobUserDetails from "../components/dashboard/accounts/admin/JobUserDetails";
import Jobs from "../components/dashboard/accounts/admin/Jobs";
import CreateJob from "../components/dashboard/accounts/admin/CreateJob";
import JobRequests from "../components/dashboard/accounts/admin/JobRequests";

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
          {
            path: "bookings",
            children: [
              { index: true, Component: AllBookings },
              { path: ":id", Component: BookingDetails },
            ],
          },
          {
            path: "tours",
            children: [
              { index: true, Component: AllTours },
              { path: ":id", Component: BookingDetails },
            ],
          },

          { path: "reviews", Component: AllReviews },
          {
            path: "users",
            children: [
              { index: true, Component: AllUsers },
              { path: ":id", Component: UserDetails },
            ],
          },

          { path: "feedbacks", Component: FeedBacks },
          { path: "payments", Component: AllPayments },
          {
            path: "guides",
            children: [
              { index: true, Component: AllGuides },
              { path: ":id", Component: GuideDetails },
            ],
          },
          {
            path: "jobs",
            children: [
              { index: true, Component: Jobs },
              { path: "create-job", Component: CreateJob },
              {
                path: "requests",
                children: [
                  { index: true, Component: JobRequests },
                  { path: ":id", Component: JobUserDetails },
                ],
              },
            ],
          },
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

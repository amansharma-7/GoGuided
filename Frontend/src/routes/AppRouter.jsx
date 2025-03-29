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
import UserReviews from "../components/dashboard/accounts/user/reviews/Reviews";
<<<<<<< HEAD
=======
import UserBookings from "../components/dashboard/accounts/user/bookings/Bookings";
>>>>>>> 4f30b6acb33863bf50b135d753152454b6318ea0

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
import Refunds from "../components/dashboard/accounts/admin/Refunds";

// guide
import GuideDashboard from "../components/dashboard/accounts/guide/Dashboard";
import UserDetails from "../components/dashboard/accounts/admin/UserDetails";
import GuideDetails from "../components/dashboard/accounts/admin/GuideDetails";
import JobUserDetails from "../components/dashboard/accounts/admin/JobUserDetails";
import Jobs from "../components/dashboard/accounts/admin/Jobs";
import CreateJob from "../components/dashboard/accounts/admin/CreateJob";
import JobRequests from "../components/dashboard/accounts/admin/JobRequests";
import ReviewDetails from "../components/dashboard/accounts/admin/ReviewDetails";
import GuideStats from "../components/dashboard/accounts/guide/Stats";
import Completed from "../components/dashboard/accounts/guide/Bookings/Completed";
import Upcoming from "../components/dashboard/accounts/guide/Bookings/Upcoming";
import Ongoing from "../components/dashboard/accounts/guide/Bookings/Ongoing";
import { Component } from "react";
import Announcements from "../components/dashboard/accounts/user/bookings/Announcements";

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
<<<<<<< HEAD
          { path: "bookings", Component: Bookings },
=======
          {
            path: "bookings",
            children: [
              { index: true, Component: UserBookings },
              { path: "announcements/:name", Component: Announcements },
            ],
          },
>>>>>>> 4f30b6acb33863bf50b135d753152454b6318ea0
          { path: "reviews", Component: UserReviews },
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
                path: "bookings/:name/:id",
                Component: BookingDetails,
              },
              {
                path: "edit/:name",
                Component: EditTour,
              },
              {
                path: "add",
                Component: AddTour,
              },
            ],
          },

          {
            path: "reviews",
            children: [
              { index: true, Component: Reviews },
              { path: ":id", Component: ReviewDetails },
            ],
          },
          {
            path: "users",
            children: [
              { index: true, Component: AllUsers },
              { path: ":id", Component: UserDetails },
            ],
          },

          { path: "feedbacks", Component: FeedBacks },
          { path: "payments", Component: AllPayments },
          { path: "refunds", Component: Refunds },
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
          { index: true, Component: GuideStats },
          { path: "settings", Component: Settings },
          {
            path: "completed-bookings",
            children: [
              { index: true, Component: Completed },
              { path: ":id", Component: BookingDetails },
            ],
          },
          {
            path: "ongoing-bookings",
            children: [
              { index: true, Component: Ongoing },
              { path: ":id", Component: BookingDetails },
            ],
          },
          {
            path: "upcoming-bookings",
            children: [
              { index: true, Component: Upcoming },
              { path: ":id", Component: BookingDetails },
            ],
          },
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

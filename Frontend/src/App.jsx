import { createBrowserRouter, RouterProvider } from "react-router";

import Home, { loader as homeLoader } from "./pages/Home";
import Tours from "./pages/Tours";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/AppLayout";
import Error from "./components/Error";
import Loading from "./components/Loading";
import AccountLayout from "./components/user/AccountLayout";
import Settings from "./components/user/settings/Settings";
import Reviews from "./components/user/reviews/Reviews";
import Bookings from "./components/user/bookings/Bookings";
import Tour from "./components/tours/Tour";
import Careers from "./components/career/Careers";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";

const router = createBrowserRouter([
  {
    Component: AppLayout,
    // errorElement: <Error />,
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
        path: "/me",
        Component: AccountLayout,
        children: [
          { index: true, Component: Settings },
          { path: "bookings", Component: Bookings },
          { path: "reviews", Component: Reviews },
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;

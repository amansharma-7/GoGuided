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

const router = createBrowserRouter([
  {
    Component: AppLayout,
    errorElement: Error,
    // hydrateFallbackElement: <Loading />,
    HydrateFallback: Loading,
    children: [
      {
        path: "/",
        loader: homeLoader,
        Component: Home,
        // hydrateFallbackElement: <div>Loading...</div>,
      },
      {
        path: "/tours",
        Component: Tours,
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
        Component: Profile,
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

import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

function AppLayout() {
  return (
    <>
      <Header />
      <main className="bg-red-200 w-full">{<Outlet />}</main>
      <Footer />
    </>
  );
}

export default AppLayout;

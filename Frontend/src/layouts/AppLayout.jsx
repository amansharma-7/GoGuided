import Navbar from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router";

function AppLayout() {
  return (
    <div className="flex flex-col relative ">
      <Navbar />
      <main className="mt-20">{<Outlet />}</main>
      <Footer />
    </div>
  );
}

export default AppLayout;

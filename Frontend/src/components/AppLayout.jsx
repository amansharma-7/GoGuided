import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

function AppLayout() {
  return (
    <div className="flex flex-col relative">
      <Header />
      <main>{<Outlet />}</main>
      <Footer />
    </div>
  );
}

export default AppLayout;

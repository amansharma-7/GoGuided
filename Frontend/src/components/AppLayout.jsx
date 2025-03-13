import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";

function AppLayout() {
  return (
    <div className="flex flex-col relative ">
      <Header />
      <main className="mt-20">{<Outlet />}</main>
      <Footer />
    </div>
  );
}

export default AppLayout;

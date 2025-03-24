import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

function AccountLayout({ children }) {
  return (
    <div className="px-32 py-4 h-[89vh] grid grid-cols-[0.3fr_0.7fr] bg-white rounded-md overflow-hidden">
      <Sidebar>{children}</Sidebar>
      <div className=" bg-green-50 rounded-r-md overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default AccountLayout;

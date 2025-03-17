import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

function AccountLayout({ children }) {
  return (
    <div className="px-32 py-6 h-[90vh] grid grid-cols-[0.3fr_0.7fr] bg-white rounded-md overflow-hidden">
      <Sidebar>{children}</Sidebar>
      <div className="px-32 py-12 flex flex-col space-y-6 bg-green-50 rounded-md scrollbar-none overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AccountLayout;

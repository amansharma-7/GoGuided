import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../common/UserContext"; // adjust path as needed
import Avatar from "../Avatar";
import { UserRound } from "lucide-react";
// import NotificationBell from "../../dashboard/accounts/user/NotificationBell";

function TopNav() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (!user) return navigate("/login");

    switch (user.role) {
      case "admin":
        return navigate("/admin");
      case "guide":
        return navigate("/guide");
      default:
        return navigate("/user");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-green-50 shadow-md z-50 px-4 py-3 flex justify-between items-center">
      <NavLink to="/">
        <img className="h-12 w-40" src="/images/logo.png" alt="logo" />
      </NavLink>

      <div className="flex gap-6">
        <button
          onClick={handleProfileClick}
          className="text-green-800 text-2xl"
        >
          {user ? (
            user.profilePicUrl ? (
              <Avatar size={48} imageURL={user.profilePicUrl} />
            ) : (
              <Avatar
                size={48}
                bgColor="bg-white"
                textColor="text-green-800"
                textSize="text-xl"
                fontWeight="font-semibold"
                fullName={user.name}
              />
            )
          ) : (
            <div className="bg-green-600 text-white p-2 rounded-full flex items-center justify-center shadow-sm shadow-nav-highlighted">
              <UserRound className="w-6 h-6" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default TopNav;

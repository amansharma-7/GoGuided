import { FaCircleUser } from "react-icons/fa6";

const user = {
  name: "Salman Khan",
  firstName: "Salman",
  lastName: "Khan",
  email: "bishnoi@298.com",
  photo:
    "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

function Profile() {
  return (
    <div className="flex items-center gap-4 p-6 text-green-100 relative">
      <div className="relative inline-block cursor-pointer">
        {user ? (
          <img
            src={
              user?.photo
                ? user.photo
                : `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName}%20${user.lastName}&backgroundColor=f5f5f5&textColor=2e7d32`
            }
            alt={user.name}
            className="w-20 h-20 sm:w-20 sm:h-20 w-16 h-16 object-cover object-center rounded-full transition-transform duration-300 ease-in-out hover:scale-110"
          />
        ) : (
          <FaCircleUser className="w-16 h-16 sm:w-20 sm:h-20 text-white transition-transform duration-300 ease-in-out hover:scale-110" />
        )}
      </div>

      {/* User Info */}
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
        <span className="font-medium text-base sm:text-lg">{user.name}</span>
        <span className="text-sm sm:text-base">{user.email}</span>
      </div>

      <div className="absolute -bottom-5 left-[10%] w-[80%] border-b-2 border-gray-400" />
    </div>
  );
}

export default Profile;

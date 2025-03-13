import { FaCircleUser } from "react-icons/fa6";

const user = {
  name: "Sudhir Sharma",
  email: "sudhirsharma9018@gmail.com",
  photo:
    "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

function Profile() {
  return (
    <div className="flex items-center gap-x-4 p-6 text-white/90 relative">
      <div className="relative inline-block cursor-pointer">
        {user?.photo ? (
          <img
            src={user.photo}
            alt={user.name}
            className="w-20 h-20 object-cover object-center rounded-full transition-transform duration-300 ease-in-out hover:scale-125"
          />
        ) : (
          <FaCircleUser className="w-20 h-20 text-white transition-transform duration-300 ease-in-out hover:scale-125" />
        )}
      </div>

      {/* User Info */}
      <div className="flex flex-col relative">
        <span className="font-medium text-lg">{user.name}</span>
        <span className="text-sm">{user.email}</span>
      </div>
      <div className="absolute -bottom-5 w-[80%] left-[10%] border-b-2 border-gray-400"></div>
    </div>
  );
}

export default Profile;

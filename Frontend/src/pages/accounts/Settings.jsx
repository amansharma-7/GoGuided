function Settings() {
  const user = {
    name: "Sudhir Sharma",
    email: "sudhirsharma9018@gmail.com",
    photo:
      "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  return (
    <div className="px-32 py-8">
      <div className="px-8 py-6 flex flex-col space-y-6 ">
        <h3 className="text-3xl font-semibold uppercase text-green-700">
          Your Account Settings
        </h3>
        <form
          // method="post"
          className="grid grid-cols-1 gap-4 pt-5"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-lg font-medium text-green-900"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="p-2 border-2 border-black/20 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-lg font-medium text-green-900"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="p-2 border-2 border-black/20 rounded-md"
            />
          </div>

          <div className="flex items-center gap-x-6">
            <div className=" inline-block cursor-pointer overflow-hidden">
              {user?.photo ? (
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-20 h-20 object-cover object-center rounded-full"
                />
              ) : (
                <FaCircleUser className="w-20 h-20 text-white" />
              )}
            </div>
            <div className="cursor-pointer text-green-600 hover:font-semibold ">
              <span className="border-b-2 py-2 px-1">Choose new photo</span>
            </div>
          </div>

          <button className="p-4 mt-2 uppercase text-lg text-white bg-green-600 rounded-md hover:bg-green-700 hover:shadow-sm hover:shadow-black/50 hover:cursor-pointer">
            Save settings
          </button>
        </form>
      </div>
      <div className="px-8 py-6 flex flex-col space-y-6 ">
        <h3 className="text-3xl font-semibold uppercase text-green-700">
          Password Change
        </h3>
        <form
          // method="post"
          className="grid grid-cols-1 gap-4 pt-5"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="current_password"
              className="text-lg font-medium text-green-900"
            >
              Current password
            </label>
            <input
              type="text"
              id="current_password"
              className="p-2 border-2 border-black/20 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="new_password"
              className="text-lg font-medium text-green-900"
            >
              New password
            </label>
            <input
              type="password"
              id="new_password"
              className="p-2 border-2 border-black/20 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirm_password"
              className="text-lg font-medium text-green-900"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirm_password"
              className="p-2 border-2 border-black/20 rounded-md"
            />
          </div>

          <button className="p-4 mt-4 text-lg uppercase text-white bg-green-600 rounded-md hover:bg-green-700 hover:shadow-sm hover:shadow-black/50 hover:cursor-pointer">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;

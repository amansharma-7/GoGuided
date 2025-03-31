import { useState } from "react";
import { FaEye, FaEyeSlash, FaCamera } from "react-icons/fa";
import Toast from "../../common/Toast";

function Settings() {
  const user = {
    name: "Sudhir Sharma",
    email: "sudhirsharma9018@gmail.com",
    photo:
      "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D",
  };

  const [profileImage, setProfileImage] = useState(user.photo);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [passwordError, setPasswordError] = useState("");
  const [toast, setToast] = useState(null);

  // Function to show toast
  const showToast = (message, type) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  // Handle Password Change
  const handlePasswordChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "confirmPassword") {
      setPasswordError(
        e.target.value !== formData.newPassword ? "Passwords do not match" : ""
      );
    }
  };

  // Toggle Password Visibility
  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Handle Profile Picture Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setIsUploading(false);
        showToast("Profile picture updated successfully!", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Password Update
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      showToast("Error: Passwords do not match!", "error");
      setPasswordError("Passwords do not match");
      return;
    }
    showToast("Password updated successfully!", "success");
  };

  return (
    <div className="px-32 py-8 space-y-6 h-full overflow-y-auto scrollbar-none">
      {/* Toast Message */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Account Settings Section */}
      <div className="p-8 flex flex-col space-y-6 shadow-sm bg-white rounded-lg">
        <h3 className="text-3xl font-semibold uppercase text-green-700">
          Your Account Settings
        </h3>
        <form className="grid grid-cols-1 gap-4 pt-5">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-lg font-medium text-green-900"
            >
              Name
            </label>
            <input
              defaultValue={user.name}
              disabled
              type="text"
              id="name"
              className="p-2 border border-green-300 rounded-md outline-none text-green-950 cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-lg font-medium text-green-900"
            >
              Email Address
            </label>
            <input
              defaultValue={user.email}
              disabled
              type="email"
              id="email"
              className="p-2 border border-green-300 rounded-md outline-none text-green-950 cursor-not-allowed"
            />
          </div>

          {/* Profile Picture Upload */}
          <div className="flex items-center gap-x-6">
            <label className="relative cursor-pointer">
              <img
                src={profileImage}
                alt="Profile"
                className="w-20 h-20 object-cover object-center rounded-full"
              />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <FaCamera className="absolute bottom-0 right-0 bg-white rounded-full p-1 text-green-700 w-6 h-6 shadow-md" />
            </label>
            {isUploading ? (
              <span className="text-green-600">Uploading...</span>
            ) : null}
          </div>
        </form>
      </div>

      {/* Password Change Section */}
      <div className="p-8 flex flex-col space-y-6 shadow-sm rounded-lg bg-white">
        <h3 className="text-3xl font-semibold uppercase text-green-700">
          Change Password
        </h3>
        <form
          className="grid grid-cols-1 gap-4 pt-5"
          onSubmit={handlePasswordSubmit}
        >
          {/* Current Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="currentPassword"
              className="text-lg font-medium text-green-900"
            >
              Current password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handlePasswordChange}
              className="p-2 border border-green-300 rounded-md outline-none text-green-950"
            />
          </div>

          {/* New Password with Eye Toggle */}
          <div className="flex flex-col gap-2 relative">
            <label
              htmlFor="newPassword"
              className="text-lg font-medium text-green-900"
            >
              New password
            </label>
            <div className="relative">
              <input
                type={showPassword.newPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handlePasswordChange}
                className="p-2 border border-green-300 outline-none rounded-md text-green-950 w-full"
              />
              <button
                type="button"
                onClick={() => toggleVisibility("newPassword")}
                className="absolute inset-y-0 right-3 flex items-center text-green-600 hover:text-green-800"
              >
                {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password with Eye Toggle */}
          <div className="flex flex-col gap-2 relative">
            <label
              htmlFor="confirmPassword"
              className="text-lg font-medium text-green-900"
            >
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handlePasswordChange}
                className="p-2 border border-green-300 outline-none rounded-md text-green-950 w-full"
              />
              <button
                type="button"
                onClick={() => toggleVisibility("confirmPassword")}
                className="absolute inset-y-0 right-3 flex items-center text-green-600 hover:text-green-800"
              >
                {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {passwordError && (
              <span className="text-red-600">{passwordError}</span>
            )}
          </div>

          {/* Update Password Button */}
          <button
            className="p-4 mt-4 text-lg uppercase text-white bg-green-600 rounded-md 
             hover:bg-green-700 hover:shadow-sm 
             disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={
              !formData.currentPassword.length ||
              !formData.newPassword.length ||
              !formData.confirmPassword.length
            }
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;

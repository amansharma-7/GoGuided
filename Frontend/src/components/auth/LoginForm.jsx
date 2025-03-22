import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
    // Add your authentication logic here
  };

  return (
    <div className="flex items-center justify-center h-[85vh] ">
      <div className="w-full max-w-md  p-8 rounded-lg shadow-lg bg-green-50">
        <h2 className="text-2xl font-semibold text-green-950 text-center mb-4">
          Log In
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          {/* Email Field */}
          <label className="w-full">
            <p className="mb-1 text-lg text-green-950">Email</p>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full focus:border-2 border-black rounded-lg p-2 text-green-950 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-400 text-xs">{errors.email.message}</p>
            )}
          </label>

          {/* Password Field */}
          <label className="relative">
            <p className="mb-1 text-lg text-green-950">Password</p>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full focus:border-2 border-black rounded-lg  p-2 text-green-950 focus:outline-none"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer text-green-900"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} />
              ) : (
                <AiOutlineEye fontSize={24} />
              )}
            </span>
            {errors.password && (
              <p className="text-red-400 text-xs">{errors.password.message}</p>
            )}
            <Link to="/forgot-password">
              <p className="mt-1 text-md text-green-900 hover:underline">
                Forgot Password?
              </p>
            </Link>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 rounded-lg bg-green-500 py-2 text-black font-semibold hover:bg-green-600 transition"
          >
            Sign In
          </button>

          {/* Signup Link */}
          <p className="mt-2 text-center text-green-950">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-800 font-semibold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

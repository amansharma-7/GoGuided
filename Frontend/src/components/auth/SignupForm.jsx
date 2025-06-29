import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router";

function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [signupStage, setSignupStage] = useState("form");
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendOtp = (data) => {
    console.log("Sending OTP to:", data.email);
    setFormData(data);
    setSignupStage("otp");

    // Call your backend API to send OTP here
    // await axios.post('/api/send-otp', { email: data.email });
  };

  // Final submission - send all data + OTP
  const handleVerifyOtp = (otpData) => {
    const finalData = { ...formData, otp: otpData.otp };
    console.log("Final Signup Data with OTP:", finalData);

    // Call your backend API to verify and create account
    // await axios.post('/api/signup', finalData);
  };

  return (
    <div className="flex items-center justify-center h-[85vh]">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-green-50">
        <h2 className="text-2xl font-semibold text-green-950 text-center mb-4">
          {signupStage === "form" ? "Create an Account" : "Verify OTP"}
        </h2>

        <form
          onSubmit={handleSubmit(
            signupStage === "form" ? handleSendOtp : handleVerifyOtp
          )}
          className="flex flex-col gap-y-4"
        >
          {signupStage === "form" ? (
            <>
              {/* First Name and Last Name */}
              <div className="flex gap-x-4">
                <label className="w-full">
                  <p className="mb-1 text-lg text-green-950">First Name</p>
                  <input
                    type="text"
                    placeholder="First Name"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    className="w-full border-black rounded-lg p-2 focus:outline-none focus:border-2 text-green-950"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-xs">
                      {errors.firstName.message}
                    </p>
                  )}
                </label>
                <label className="w-full">
                  <p className="mb-1 text-lg text-green-950">Last Name</p>
                  <input
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className="w-full border-black rounded-lg p-2 focus:outline-none focus:border-2 text-green-950"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-xs">
                      {errors.lastName.message}
                    </p>
                  )}
                </label>
              </div>

              {/* Email */}
              <label>
                <p className="mb-1 text-lg text-green-950">Email Address</p>
                <input
                  type="email"
                  placeholder="Enter email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email format",
                    },
                  })}
                  className="w-full border-black rounded-lg p-2 focus:outline-none focus:border-2 text-green-950"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs">{errors.email.message}</p>
                )}
              </label>

              {/* Contact Number */}
              <label>
                <p className="mb-1 text-lg text-green-950">Contact</p>
                <div className="flex gap-x-4">
                  <select
                    {...register("countryCode", {
                      required: "Code is required",
                    })}
                    className="w-1/3 border-black rounded-lg p-2 text-green-950 focus:outline-none"
                  >
                    <option value="+1">+1 (US)</option>
                    <option value="+91">+91 (IN)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+61">+61 (AU)</option>
                    <option value="+81">+81 (JP)</option>
                  </select>

                  <input
                    type="tel"
                    placeholder="Contact Number"
                    {...register("contactNumber", {
                      required: "Contact number is required",
                      pattern: {
                        value: /^[0-9]{7,15}$/,
                        message: "Invalid contact number",
                      },
                    })}
                    className="w-2/3 border-black rounded-lg p-2 text-green-950 focus:outline-none"
                  />
                </div>
                {(errors.countryCode || errors.contactNumber) && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.countryCode?.message ||
                      errors.contactNumber?.message}
                  </p>
                )}
              </label>

              {/* Passwords */}
              <div className="flex gap-x-4">
                <label className="relative w-full">
                  <p className="mb-1 text-lg text-green-950">Create Password</p>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters",
                      },
                    })}
                    className="w-full border-black rounded-lg p-2 pr-10 focus:outline-none focus:border-2 text-green-950"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] cursor-pointer text-gray-400"
                  >
                    {showPassword ? (
                      <AiOutlineEye fontSize={24} />
                    ) : (
                      <AiOutlineEyeInvisible fontSize={24} />
                    )}
                  </span>
                  {errors.password && (
                    <p className="text-red-400 text-xs">
                      {errors.password.message}
                    </p>
                  )}
                </label>

                <label className="relative w-full">
                  <p className="mb-1 text-lg text-green-950">
                    Confirm Password
                  </p>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    {...register("confirmPassword", {
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    className="w-full border-black rounded-lg p-2 pr-10 focus:outline-none focus:border-2 text-green-950"
                  />
                  <span
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] cursor-pointer text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEye fontSize={24} />
                    ) : (
                      <AiOutlineEyeInvisible fontSize={24} />
                    )}
                  </span>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-xs">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </label>
              </div>

              {/* Send OTP Button */}
              <button
                type="submit"
                className="mt-4 rounded-lg bg-green-500 py-2 text-black font-semibold hover:bg-green-400 transition cursor-pointer"
              >
                Send OTP
              </button>
            </>
          ) : (
            <>
              {/* OTP Input */}
              <label>
                <p className="mb-1 text-lg text-green-950">Enter OTP</p>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  {...register("otp", {
                    required: "OTP is required",
                    minLength: {
                      value: 4,
                      message: "OTP should be 4-6 digits",
                    },
                    maxLength: {
                      value: 6,
                      message: "OTP should be 4-6 digits",
                    },
                  })}
                  className="w-full border-black rounded-lg p-2 text-green-950 focus:outline-none focus:border-2"
                />
                {errors.otp && (
                  <p className="text-red-400 text-xs">{errors.otp.message}</p>
                )}
              </label>

              {/* Final Create Account */}
              <button
                type="submit"
                className="mt-4 rounded-lg bg-green-500 py-2 text-black font-semibold hover:bg-green-400 transition cursor-pointer"
              >
                Create Account
              </button>
            </>
          )}

          {/* Link to Login */}
          <p className="mt-2 text-center text-green-950">
            Already have an account?{" "}
            <Link to="/login" className="text-green-800 font-semibold">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;

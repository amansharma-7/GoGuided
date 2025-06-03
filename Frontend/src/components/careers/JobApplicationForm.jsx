import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import useSafeNavigate from "../../utils/useSafeNavigate";

const JobApplicationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { name } = useParams();
  const navigate = useSafeNavigate();
  const resumeFile = watch("resume");

  const onSubmit = (data) => {
    console.log("Application Submitted:", data);
    reset();
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center p-4 min-h-screen bg-green-50 text-green-950">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg sm:max-w-md md:max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-950">
          Apply for {name}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <label htmlFor="fullName" className="sr-only">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Full Name"
            {...register("fullName", { required: "Name is required" })}
            className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}

          {/* Email */}
          <label htmlFor="email" className="sr-only">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Phone */}
          <label htmlFor="phone" className="sr-only">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="Phone Number"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9+\-() ]{7,}$/,
                message: "Invalid phone number",
              },
            })}
            className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}

          {/* LinkedIn */}
          <label htmlFor="linkedin" className="sr-only">
            LinkedIn Profile
          </label>
          <input
            id="linkedin"
            type="url"
            placeholder="LinkedIn Profile (url)"
            {...register("linkedin")}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-300"
          />

          {/* Portfolio */}
          <label htmlFor="portfolio" className="sr-only">
            Portfolio
          </label>
          <input
            id="portfolio"
            type="url"
            placeholder="Portfolio (url)"
            {...register("portfolio")}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-300"
          />

          {/* Experience */}
          <label htmlFor="experience" className="sr-only">
            Years of Experience
          </label>
          <input
            id="experience"
            type="number"
            placeholder="Years of Experience"
            {...register("experience", { min: 0 })}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-300"
          />

          {/* Resume Upload */}
          <div className="relative w-full">
            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
              {...register("resume", { required: "Resume is required" })}
              className="opacity-0 absolute w-full h-full z-10 cursor-pointer"
            />
            <div className="border px-3 py-2 rounded flex justify-between items-center w-full bg-white">
              <span className="text-gray-700 truncate max-w-[65%]">
                {resumeFile && resumeFile.length > 0
                  ? resumeFile[0].name
                  : "Upload your resume"}
              </span>
              <label
                htmlFor="resume"
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm cursor-pointer select-none"
              >
                Choose File
              </label>
            </div>
            {errors.resume && (
              <p className="text-red-500 text-sm mt-1">
                {errors.resume.message}
              </p>
            )}
          </div>

          {/* Cover Letter / Message */}
          <label htmlFor="message" className="sr-only">
            Cover Letter / Message
          </label>
          <textarea
            id="message"
            rows="4"
            placeholder="Cover Letter / Message"
            {...register("message")}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 border-gray-300"
          ></textarea>

          {/* Buttons */}
          <div className="flex justify-between pt-2">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer transition"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer transition"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;

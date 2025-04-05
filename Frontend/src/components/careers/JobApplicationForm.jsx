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
    <div className="flex items-center justify-center p-4 min-h-screen text-green-950">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-950">
          Apply for {name}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullName", { required: "Name is required" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}

          <input
            type="email"
            placeholder="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            type="tel"
            placeholder="Phone Number"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9+\-() ]{7,}$/,
                message: "Invalid phone number",
              },
            })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}

          <input
            type="url"
            placeholder="LinkedIn Profile (optional)"
            {...register("linkedin")}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="url"
            placeholder="Portfolio/Website (optional)"
            {...register("portfolio")}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="number"
            placeholder="Years of Experience"
            {...register("experience", { min: 0 })}
            className="w-full border px-3 py-2 rounded"
          />

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
                className="bg-green-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
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

          <textarea
            rows="4"
            placeholder="Cover Letter / Message"
            {...register("message")}
            className="w-full border px-3 py-2 rounded"
          ></textarea>

          <div className="flex justify-between pt-2">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
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

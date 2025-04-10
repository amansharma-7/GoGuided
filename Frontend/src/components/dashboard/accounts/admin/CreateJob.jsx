import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function CreateJob() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      salary: {
        min: 0,
        max: 0,
      },
    },
  });

  const submitJob = (data) => {
    console.log("Job Created:", data);
    reset();
    navigate("/"); // Navigate back to job management page
  };

  return (
    <div
      className=" p-4 flex justify-center w-full h-full overflow-y-scroll scrollbar-hide  "
      onClick={() => setIsFormOpen && setIsFormOpen(false)}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-full h-fit"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[30px] font-bold mb-4 text-green-950">
          Create a Job
        </h2>
        <form onSubmit={handleSubmit(submitJob)} className="space-y-3">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-green-700">
              Job Title:
            </label>
            <input
              {...register("title", { required: "Job title is required" })}
              type="text"
              placeholder="Job Title"
              className="border p-3 w-full rounded-md "
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-green-700">
              Job Description:
            </label>
            <textarea
              {...register("description", {
                required: "Job description is required",
              })}
              placeholder="Job Description"
              className="border p-3 w-full rounded-md"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-green-700">
              Location:
            </label>
            <input
              {...register("location", { required: "Location is required" })}
              type="text"
              placeholder="Location"
              className="border p-3 w-full rounded-md"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-green-700">
              Type:
            </label>
            <select
              {...register("type", { required: "Type is required" })}
              className="border p-3 w-full rounded-md"
            >
              <option value="">Select type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-green-700">
              Level:
            </label>
            <select
              {...register("level", { required: "Level is required" })}
              className="border p-3 w-full rounded-md"
            >
              <option value="">Select level</option>
              <option value="Junior">Junior</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
            </select>
            {errors.level && (
              <p className="text-red-500 text-sm">{errors.level.message}</p>
            )}
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">
              Salary Range(INR)
            </label>
            <div className="flex gap-3">
              {/* Min Salary */}
              <div className="flex-1">
                <input
                  {...register("salary.min", {
                    required: "Minimum salary is required",
                    min: { value: 0, message: "Must be positive" },
                  })}
                  type="number"
                  placeholder="Min Salary"
                  className="border p-3 w-full rounded-md"
                />
                {errors.salary?.min && (
                  <p className="text-red-500 text-sm">
                    {errors.salary.min.message}
                  </p>
                )}
              </div>

              {/* Max Salary */}
              <div className="flex-1">
                <input
                  {...register("salary.max", {
                    required: "Maximum salary is required",
                    min: { value: 0, message: "Must be positive" },
                  })}
                  type="number"
                  placeholder="Max Salary"
                  className="border p-3 w-full rounded-md"
                />
                {errors.salary?.max && (
                  <p className="text-red-500 text-sm">
                    {errors.salary.max.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Last Date */}
          <div>
            <label className="block text-sm font-medium text-green-700">
              Last Date:
            </label>
            <input
              {...register("lastDate", { required: "Last date is required" })}
              type="date"
              className="border p-3 w-full rounded-md"
            />
            {errors.lastDate && (
              <p className="text-red-500 text-sm">{errors.lastDate.message}</p>
            )}
          </div>

          {/* Number of Posts */}
          <div>
            <label className="block text-sm font-medium text-green-700">
              Number of Posts:
            </label>
            <input
              {...register("posts", {
                required: "Number of posts is required",
                min: { value: 1, message: "Must be at least 1 post" },
              })}
              type="number"
              placeholder="Number of Posts"
              className="border p-3 w-full rounded-md"
            />
            {errors.posts && (
              <p className="text-red-500 text-sm">{errors.posts.message}</p>
            )}
          </div>

          {/* Hidden Applicants Field */}
          <input type="hidden" {...register("applicants")} />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJob;

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function CreateJob() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitJob = (data) => {
    console.log("Job Created:", data);
    reset();
    navigate("/"); // Navigate back to job management page
  };

  return (
    <div
      className=" p-4 flex items-center justify-center w-full "
      onClick={() => setIsFormOpen(false)}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-full"
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

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-green-700">
              Role:
            </label>
            <input
              {...register("role", { required: "Role is required" })}
              type="text"
              placeholder="Role"
              className="border p-3 w-full rounded-md"
            />
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
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

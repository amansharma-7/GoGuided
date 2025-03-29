import { useState } from "react";
import { FaArrowLeft, FaSave, FaTimes } from "react-icons/fa";
import LocationInput from "./LocationInput";
import useSafeNavigate from "../../utils/useSafeNavigate";

const tourTypes = ["Adventure", "Hiking", "Wildlife Safari", "Cultural Tour"];
const difficulties = ["Easy", "Intermediate", "Advanced"];

export default function TourForm({ mode = "add", initialData = {}, onSubmit }) {
  const navigate = useSafeNavigate();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    duration: "",
    price: "",
    type: tourTypes[0],
    difficulty: difficulties[0],
    groupSize: "",
    description: "",
    images: [],
    ...initialData,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const handleImageRemove = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <div className="bg-green-50 sh rounded-lg shadow-smded-lg w-full px-5 py-0.5 h-full overflow-y-auto scrollbar-hide">
      <div className="bg-white p-5 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-green-700">
            {mode === "edit" ? "Edit Tour" : "Add New Tour"}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200 focus:outline-none cursor-pointer"
          >
            <FaArrowLeft className="mr-2 inline-block" /> Back
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Tour Name */}
          <div className="col-span-2">
            <label className="block mb-2 text-green-700 font-medium">
              Tour Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tour Name"
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block mb-2 text-green-700 font-medium">
              Description:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief Description"
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
              rows="4"
            />
          </div>

          {/* Location */}
          <div className="col-span-2">
            <label className="block mb-2 text-green-700 font-medium">
              Location:
            </label>
            <LocationInput
              value={formData.location}
              onChange={(val) => setFormData({ ...formData, location: val })}
            />
          </div>

          {/* Duration & Price */}
          <div>
            <label className="block mb-2 text-green-700 font-medium">
              Duration:
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration (days)"
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-green-700 font-medium">
              Price:
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price (₹)"
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Type & Difficulty */}
          <div>
            <label className="block mb-2 text-green-700 font-medium">
              Tour Type:
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
            >
              {tourTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-green-700 font-medium">
              Difficulty:
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
            >
              {difficulties.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Group Size */}
          <div className="col-span-2">
            <label className="block mb-2 text-green-700 font-medium">
              Group Size:
            </label>
            <input
              type="number"
              name="groupSize"
              value={formData.groupSize}
              onChange={handleChange}
              placeholder="Max Group Size"
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Start Date & End Date */}
          <div>
            <label className="block mb-2 text-green-700 font-medium">
              Start Date:
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-green-700 font-medium">
              End Date:
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Image Upload */}
          <div className="col-span-2">
            <label className="block mb-2 text-green-700 font-medium">
              Upload Images:
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none"
            />
            {/* Image Preview */}
            <div className="mt-3 flex gap-3 flex-wrap">
              {formData.images.map((image, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md shadow-md"
                  />
                  <button
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="col-span-2 flex justify-end">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center cursor-pointer">
              <FaSave className="mr-2" />{" "}
              {mode === "edit" ? "Update Tour" : "Save Tour"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

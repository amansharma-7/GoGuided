import { useForm, useFieldArray } from "react-hook-form";
import { FaArrowLeft, FaSave, FaTimes, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import MapPicker from "./MapPicker";

const guidesData = [
  {
    _id: "g1",
    name: "Ravi Mehta",
    email: "ravi.mehta@example.com",
    phone: "+91 9876543210",
    avatar: "https://i.pravatar.cc/150?img=10",
    role: "Senior Guide",
  },
  {
    _id: "g2",
    name: "Anjali Sharma",
    email: "anjali.sharma@example.com",
    phone: "+91 9876543211",
    avatar: "https://i.pravatar.cc/150?img=20",
    role: "Local Expert",
  },
  {
    _id: "g3",
    name: "Mohammed Khan",
    email: "mohammed.khan@example.com",
    phone: "+91 9876543212",
    avatar: "https://i.pravatar.cc/150?img=30",
    role: "Hiking Specialist",
  },
];

export default function AddTourForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      location: "",
      duration: "",
      participants: "",
      difficulty: "Medium",
      languages: "",
      startDate: "",
      overview: "",
      description: "",
      pricePerPerson: "",
      highlights: [""],
      included: [""],
      guides: [],
      images: [],
      thumbnail: null,
      stops: [],
    },
  });

  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({ control, name: "highlights" });

  const {
    fields: includedFields,
    append: appendIncluded,
    remove: removeIncluded,
  } = useFieldArray({ control, name: "included" });

  const {
    fields: guideFields,
    append: appendGuide,
    remove: removeGuide,
  } = useFieldArray({ control, name: "guides" });

  const {
    fields: stopFields,
    append: appendStop,
    remove: removeStop,
    update: updateStop,
  } = useFieldArray({ control, name: "stops" });

  const [imageFiles, setImageFiles] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [allGuides, setAllGuides] = useState([]);
  const [mapPickerConfig, setMapPickerConfig] = useState(null);

  useEffect(() => {
    setAllGuides(guidesData);
  }, []);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const previews = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      const updatedFiles = [...imageFiles, ...previews];
      setImageFiles(updatedFiles);
      setValue("images", updatedFiles);
    },
    [imageFiles, setValue]
  );

  const onThumbnailDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const preview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        setThumbnailFile(preview);
        setValue("thumbnail", preview);
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
  } = useDropzone({
    onDrop: onThumbnailDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const removeImage = (index) => {
    const updated = imageFiles.filter((_, i) => i !== index);
    setImageFiles(updated);
    setValue("images", updated);
  };

  const onSubmit = (data) => {
    const localDateStr = data.startDate; // e.g., "2025-07-08"
    const dateObj = new Date(localDateStr + "T00:00:00Z"); // UTC midnight

    const finalData = {
      ...data,
      startDate: dateObj, // 👈 send actual Date object
    };

    console.log("Final Form Data:", finalData);
    // Submit finalData to your API
  };

  const inputClass =
    "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500";

  return (
    <div className="p-6 bg-green-50 h-full overflow-y-auto scrollbar-hide">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-full mx-auto sm:max-w-xl md:max-w-4xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-green-700">Add New Tour</h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer whitespace-nowrap"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* title, location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-green-700 mb-1">Title</label>
              <input
                {...register("title", { required: true })}
                className={inputClass}
              />
              {errors.title && (
                <p className="text-red-600 text-sm">Title is required.</p>
              )}
            </div>

            <div>
              <label className="block text-green-700 mb-1">Location</label>
              <input
                {...register("location", { required: true })}
                className={inputClass}
              />
              {errors.location && (
                <p className="text-red-600 text-sm">Location is required.</p>
              )}
            </div>
          </div>

          {/* duration and participants*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* duration  */}
            <div>
              <label className="block text-green-700 mb-1">
                Duration (in days)
              </label>
              <input
                type="number"
                step="any"
                {...register("duration", {
                  required: "Duration is required",
                })}
                className={inputClass}
              />
              {errors.duration && (
                <p className="text-red-600 text-sm">Duration is required</p>
              )}
            </div>

            {/* participants */}
            <div>
              <label className="block text-green-700 mb-1">
                Number of Participants
              </label>
              <input
                type="number"
                step="1"
                min="1"
                {...register("participants", {
                  required: "Number of participants is required",
                  valueAsNumber: true,
                })}
                className={inputClass}
              />
              {errors.participants && (
                <p className="text-red-600 text-sm">
                  {errors.participants.message}
                </p>
              )}
            </div>

            {/* start date  */}
            <div>
              <label className="block text-green-700 mb-1">Start Date</label>
              <input
                type="date"
                {...register("startDate", {
                  required: "Start Date is required",
                })}
                className={inputClass}
              />
              {errors.startDate && (
                <p className="text-red-600 text-sm">Start Date is required</p>
              )}
            </div>

            {/* difficulty  */}
            <div>
              <label className="block text-green-700 mb-1">Difficulty</label>
              <select
                {...register("difficulty", {
                  required: "Difficulty is required",
                })}
                className={inputClass}
              >
                <option value="">Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="hard">Hard</option>
              </select>
              {errors.difficulty && (
                <p className="text-red-600 text-sm">
                  {errors.difficulty.message}
                </p>
              )}
            </div>

            {/* languages  */}
            <div>
              <label className="block text-green-700 mb-1">
                Languages (comma-separated)
              </label>
              <input
                type="text"
                placeholder="e.g. English, Spanish, Hindi"
                {...register("languages", {
                  required: "Languages are required",
                })}
                className={inputClass}
              />
              {errors.languages && (
                <p className="text-red-600 text-sm">
                  {errors.languages.message}
                </p>
              )}
            </div>

            {/* price  */}
            <div>
              <label className="block text-green-700 mb-1">
                Price per person (INR)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register("pricePerPerson", {
                  required: "Price is required",
                  valueAsNumber: true,
                })}
                className={inputClass}
              />
              {errors.pricePerPerson && (
                <p className="text-red-600 text-sm">
                  Price per person is required
                </p>
              )}
            </div>
          </div>

          {/* description */}
          <div>
            <label className="block text-green-700 mb-1">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
                validate: (value) =>
                  value.trim().split(/\s+/).length <= 10 ||
                  "Maximum 10 words allowed",
              })}
              rows={2}
              className={`${inputClass}`}
              placeholder="Enter a small description upto 10 words"
            />
            {errors.description && (
              <p className="text-red-600 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Overview textarea */}
          <div>
            <label className="block text-green-700 mb-1">Overview</label>
            <textarea
              {...register("overview")}
              className={inputClass}
              rows={4}
            />
          </div>

          {/* Highlights and Included fields */}
          {[
            {
              title: "Highlights",
              name: "highlights",
              fields: highlightFields,
              append: appendHighlight,
              remove: removeHighlight,
            },
            {
              title: "Included",
              name: "included",
              fields: includedFields,
              append: appendIncluded,
              remove: removeIncluded,
            },
          ].map(({ title, name, fields, append, remove }) => (
            <div key={name}>
              <label className="block text-green-700 mb-1">{title}</label>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col sm:flex-row gap-2 mb-2"
                >
                  <input
                    {...register(`${name}.${index}`)}
                    defaultValue={field || ""}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer w-full sm:w-auto"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append("")}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded cursor-pointer whitespace-nowrap"
              >
                Add {title.slice(0, -1)}
              </button>
            </div>
          ))}

          {/* Guides */}
          <div>
            <label className="block text-green-700 mb-2">Guides</label>
            {guideFields.map((_, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center gap-2 mb-2"
              >
                <select
                  {...register(`guides.${index}.id`, { required: true })}
                  className={inputClass}
                >
                  <option value="">-- Select Guide --</option>
                  {allGuides.map((guide) => (
                    <option key={guide._id} value={guide._id}>
                      {guide.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeGuide(index)}
                  className="text-red-600 hover:text-red-700 cursor-pointer whitespace-nowrap"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendGuide({ id: "" })}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded cursor-pointer whitespace-nowrap"
            >
              Add Guide
            </button>
          </div>

          {/* Stops */}
          <div>
            <label className="block text-green-700 mb-2">Stops (Per Day)</label>
            {stopFields.map((stop, index) => (
              <div key={stop.id} className="mb-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  {/* Day (Read-only Input) */}
                  <input
                    type="number"
                    value={index + 1}
                    readOnly
                    className="w-20 px-2 py-2 border border-gray-300 rounded bg-gray-100 text-center"
                  />

                  {/* Description Input */}
                  <input
                    type="text"
                    defaultValue={stop.description || ""}
                    onBlur={(e) =>
                      updateStop(index, { description: e.target.value })
                    }
                    placeholder="What will the tour do at this location?"
                    className={`${inputClass} flex-1`}
                  />

                  {/* Location Name Input */}
                  <input
                    value={stop.name || ""}
                    readOnly
                    className={`${inputClass} bg-gray-50 flex-1`}
                    placeholder="Location"
                  />

                  {/* Choose Location Button */}
                  <button
                    type="button"
                    onClick={() => setMapPickerConfig({ type: "stop", index })}
                    className="w-full sm:w-40 px-2 py-2 bg-green-500 text-white rounded hover:bg-green-600 whitespace-nowrap"
                  >
                    Choose Location
                  </button>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeStop(index)}
                    className="text-red-600 hover:text-red-700 cursor-pointer whitespace-nowrap"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            ))}

            {/* Add Stop Button */}
            <button
              type="button"
              onClick={() =>
                appendStop({
                  name: "",
                  lat: "",
                  lng: "",
                  description: "",
                })
              }
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
            >
              Add Stop
            </button>
          </div>

          {/* Tour Images */}
          <div>
            <label className="block text-green-700 mb-1">Tour Images</label>
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-green-400 p-4 rounded text-center cursor-pointer bg-gray-50"
            >
              <input {...getInputProps()} />
              <p>Drag & drop some images here, or click to select files</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {imageFiles.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={file.preview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 cursor-pointer"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Thumbnail Image */}
          <div>
            <label className="block text-green-700 mb-1">Thumbnail Image</label>
            <div
              {...getThumbnailRootProps()}
              className="border-2 border-dashed border-green-400 p-4 rounded text-center cursor-pointer bg-gray-50"
            >
              <input {...getThumbnailInputProps()} />
              <p>Drag & drop a thumbnail image here, or click to select</p>
            </div>
            {thumbnailFile && (
              <div className="mt-4 w-32 h-32">
                <img
                  src={thumbnailFile.preview}
                  alt="Thumbnail Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <FaSave />
              Save Tour
            </button>
          </div>
        </form>

        {mapPickerConfig &&
          (() => {
            const stop = getValues(`stops.${mapPickerConfig.index}`);

            const lat = parseFloat(stop?.lat);
            const lng = parseFloat(stop?.lng);
            const description = stop.description;

            const initialSpots =
              !isNaN(lat) && !isNaN(lng) ? [{ ...stop, lat, lng }] : [];

            return (
              <MapPicker
                initialSpots={initialSpots}
                onClose={() => setMapPickerConfig(null)}
                onConfirm={([picked]) => {
                  if (!picked) {
                    setMapPickerConfig(null);
                    return;
                  }
                  updateStop(mapPickerConfig.index, picked);
                  setMapPickerConfig(null);
                }}
                description={description}
              />
            );
          })()}
      </div>
    </div>
  );
}

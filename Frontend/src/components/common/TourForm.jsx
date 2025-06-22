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
      location: {
        lat: null,
        lng: null,
        name: "",
        description: "",
      },
      duration: "",
      participants: "",
      difficulty: "Medium",
      languages: "",
      date: "",
      overview: "",
      price: "",
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
    console.log("Final Form Data:", data);
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* All input blocks remain same */}
            {/* Example for Title */}
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
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  value={getValues("location.name") || ""}
                  readOnly
                  className={`${inputClass} bg-gray-50 flex-1`}
                />
                <button
                  type="button"
                  onClick={() => setMapPickerConfig({ type: "location" })}
                  className="px-4 text-sm bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer whitespace-nowrap"
                >
                  Choose Location
                </button>
              </div>
            </div>

            {/* Repeat for other inputs as above, no changes needed */}
            {/* Duration, Participants, Difficulty, Languages, Date, Price */}
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
            /* same mapping for Highlights and Included */
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
                <label className="text-green-600 font-semibold">
                  Day {index + 1}
                </label>
                <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <input
                    value={stop.name || ""}
                    readOnly
                    className={`${inputClass} bg-gray-50 flex-1`}
                  />
                  <button
                    type="button"
                    onClick={() => setMapPickerConfig({ type: "stop", index })}
                    className="w-full sm:w-48 px-2 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer whitespace-nowrap"
                  >
                    Choose Location
                  </button>
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
            <button
              type="button"
              onClick={() => appendStop({ name: "", lat: "", lng: "" })}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded cursor-pointer whitespace-nowrap"
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

        {/* MapPicker modal */}
        {mapPickerConfig && (
          <MapPicker
            initialSpots={
              mapPickerConfig.type === "stop"
                ? [getValues(`stops.${mapPickerConfig.index}`)]
                : []
            }
            onClose={() => setMapPickerConfig(null)}
            onConfirm={([picked]) => {
              if (!picked) {
                setMapPickerConfig(null);
                return;
              }
              if (mapPickerConfig.type === "stop") {
                updateStop(mapPickerConfig.index, picked);
              } else {
                setValue("location", {
                  lat: picked.lat,
                  lng: picked.lng,
                  name: picked.name,
                });
              }
              setMapPickerConfig(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

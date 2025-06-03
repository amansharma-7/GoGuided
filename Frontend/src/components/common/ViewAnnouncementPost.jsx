import { FaTimes } from "react-icons/fa";

function ViewAnnouncementPost({ isOpen, onClose, announcement }) {
  if (!isOpen || !announcement) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-red-600 hover:text-red-900 cursor-pointer"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-bold text-green-800 mb-2">
          {announcement.title}
        </h2>
        <p className="text-green-700">{announcement.message}</p>
        <div className="mt-4 text-sm text-gray-600">
          Posted by: <span className="font-bold">{announcement.postedBy}</span>
        </div>
        <div className="mt-1 text-sm text-gray-500">
          Date: {announcement.date}
        </div>
      </div>
    </div>
  );
}

export default ViewAnnouncementPost;

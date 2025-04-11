function CallToAction({}) {
  return (
    <div className="flex flex-col justify-between w-[60%] p-8 rounded-lg shadow-sm h-full min-h-[400px]">
      {/* Top Images */}
      <div className="flex justify-center -space-x-12 mb-6">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
          alt="Beach"
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
        />
        <img
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
          alt="Adventure"
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
        />
        <img
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
          alt="Adventure"
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
        />
      </div>

      {/* Middle Text */}
      <div className="text-center mb-6">
        <h2 className="text-green-700 font-bold text-2xl leading-snug mb-2">
          What Are You Waiting For?
        </h2>
        <p className="text-gray-700 text-sm">
          7 days. 1 adventure. Infinite memories. Make it yours today!
        </p>
      </div>

      {/* Bottom Button */}
      <div className="flex justify-center">
        <button className="bg-green-600 text-white text-sm font-semibold py-3 px-8 rounded-full shadow-md hover:bg-green-700 transition-all duration-300 cursor-pointer">
          Book Tour Now!
        </button>
      </div>
    </div>
  );
}

export default CallToAction;

function Stats() {
  return (
    <div className="-mx-28 -my-8 flex flex-col space-y-4">
      <div className="grid grid-cols-4 gap-4 h-40">
        <div className="bg-red-500 shadow-md shadow-black/50 rounded-md">
          Bookings
        </div>
        <div className="bg-red-500 shadow-md shadow-black/50 rounded-md">
          Completed
        </div>
        <div className="bg-red-500 shadow-md shadow-black/50 rounded-md">
          Ongoing
        </div>
        <div className="bg-red-500 shadow-md shadow-black/50 rounded-md">
          Rating
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 bg-green-500 h-96 rounded-md overflow-hidden">
        <div className="bg-amber-400 "></div>
        <div className="bg-amber-400 "></div>
      </div>
      <div className="grid grid-cols-4 gap-4 ">
        <div className="bg-red-500 shadow-md shadow-black/50 rounded-md h-40"></div>
        <div className="bg-red-500 shadow-md shadow-black/50 rounded-md"></div>
        <div className="bg-red-500 shadow-md shadow-black/50 rounded-md"></div>
        <div className="bg-red-500 shadow-md shadow-black/50 rounded-md"></div>
        <div className="bg-red-500 shadow-md shadow-black/50 rounded-md h-40"></div>
        <div className="bg-red-500 shadow-md shadow-black/50 rounded-md"></div>
        <div className="bg-red-500 shadow-md shadow-black/50 rounded-md"></div>
        <div className="bg-red-500 shadow-md shadow-black/50 rounded-md"></div>
      </div>
    </div>
  );
}

export default Stats;

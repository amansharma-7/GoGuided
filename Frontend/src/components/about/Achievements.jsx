function Achievements() {
  return (
    <div className="px-32 flex flex-col gap-6 py-6 items-center">
      <h3 className="text-5xl font-bold">Our Achievements</h3>
      <div className="grid grid-cols-6 gap-4">
        <div className="flex flex-col items-center gap-1 p-3 shadow-sm shadow-black/40 rounded-lg">
          <span className="font-semibold text-3xl">50+</span>
          <p>Destinations Covered.</p>
        </div>
        <div className="flex flex-col items-center gap-1  p-3 shadow-sm shadow-black/40 rounded-lg">
          <span className="font-semibold text-3xl">98%</span>
          <p>Customer Satisfaction</p>
        </div>
        <div className="flex flex-col items-center gap-1  p-3 shadow-sm shadow-black/40 rounded-lg ">
          <span className="font-semibold text-3xl">85%</span>
          <p>Repeat Travelers</p>
        </div>
        <div className="flex flex-col items-center gap-1 p-3 shadow-sm shadow-black/40 rounded-lg">
          <span className="font-semibold text-3xl">4.9/5</span>
          <p>Average Rating</p>
        </div>
        <div className="flex flex-col items-center gap-1 p-3 shadow-sm shadow-black/40 rounded-lg ">
          <span className="font-semibold text-3xl">10%</span>
          <p>Profits Donated</p>
        </div>
        <div className="flex flex-col items-center gap-1 p-3 shadow-sm shadow-black/40 rounded-lg">
          <span className="font-semibold text-3xl">100+</span>
          <p>Trips Planned</p>
        </div>
      </div>
    </div>
  );
}

export default Achievements;

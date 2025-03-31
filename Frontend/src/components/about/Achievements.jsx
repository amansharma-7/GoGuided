const achievementData = [
  { value: "50+", description: "Destinations Covered" },
  { value: "98%", description: "Customer Satisfaction" },
  { value: "85%", description: "Repeat Travelers" },
  { value: "4.9/5", description: "Average Rating" },
  { value: "10%", description: "Profits Donated" },
  { value: "100+", description: "Trips Planned" },
];

function Achievements() {
  return (
    <div className="px-32 py-6 flex flex-col gap-6 items-center">
      <h3 className="text-3xl font-bold text-green-900">Our Achievements</h3>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-6 w-full">
        {achievementData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 p-5 border border-green-700 rounded-2xl bg-white shadow-md shadow-black/50 transition-transform duration-200 ease-in-out hover:scale-105"
          >
            <span className="text-4xl font-extrabold text-green-900">
              {item.value}
            </span>
            <p className="text-green-900 font-medium text-center">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Achievements;

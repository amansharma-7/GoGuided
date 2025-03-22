function Achievements({ achievementData }) {
  return (
    <div className="px-32 flex flex-col gap-6 py-6 items-center">
      <h3 className="text-5xl font-bold">Our Achievements</h3>
      <div className="grid grid-cols-6 gap-4">
        {achievementData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-1 p-3 shadow-sm shadow-black/40 rounded-lg"
          >
            <span className="font-semibold text-3xl">{item.value}</span>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Achievements;

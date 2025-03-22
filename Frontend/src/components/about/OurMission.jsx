function OurMission({ missionData }) {
  return (
    <div className="px-32 py-6 flex flex-col gap-6 items-center">
      <h3 className="text-5xl font-bold">Our Mission</h3>
      <div className="grid grid-cols-4 gap-4">
        {missionData.map((mission, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 items-center w-72 p-4 shadow-sm shadow-black/40 rounded-lg"
          >
            {mission.icon}
            <p className="font-semibold">{mission.title}</p>
            <p className="px-3 tracking-tight">{mission.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurMission;

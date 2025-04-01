import TourCard from "./TourCard";

function ToursGrid({ tours }) {
  return (
    <div className="grid grid-cols-3 gap-10 p-6 px-24 rounded-md h-full overflow-y-auto scrollbar-none">
      {tours.map((tour, i) => (
        <TourCard key={i} tour={tour} />
      ))}
    </div>
  );
}

export default ToursGrid;

import TourCard from "./TourCard";

const tours = Array.from({ length: 12 });

function ToursGrid() {
  return (
    <div className="grid grid-cols-3 gap-10 p-6 px-24 rounded-md h-full overflow-y-auto scrollbar-none">
      {tours.map((tour, i) => (
        <TourCard key={i} id="meow" />
      ))}
    </div>
  );
}

export default ToursGrid;

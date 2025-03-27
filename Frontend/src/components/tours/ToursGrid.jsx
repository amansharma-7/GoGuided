import TourCard from "./TourCard";

function ToursGrid({ tours = [] }) {
  return (
    <div className="grid grid-cols-3 gap-10 p-6 px-24 rounded-md">
      {tours.map((tour, i) => (
        <TourCard key={i} id="meow" />
      ))}
    </div>
  );
}

export default ToursGrid;

import TourCard from "./TourCard";

function ToursGrid({ tours }) {
  return (
    <div className="grid grid-cols-3 gap-10 p-6 px-16 rounded-md ">
      {tours.map((tour, i) => (
        <TourCard key={i} tour={tour} />
      ))}
    </div>
  );
}

export default ToursGrid;

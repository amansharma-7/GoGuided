import TourCard from "./TourCard";

function ToursGrid({ tours }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-6 rounded-md">
      {tours.map((tour) => (
        <TourCard key={tour._id} tour={tour} />
      ))}
    </div>
  );
}

export default ToursGrid;

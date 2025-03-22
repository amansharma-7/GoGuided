import ToursHeader from "../components/tours/ToursHeader";
import ToursGrid from "../components/tours/ToursGrid";

const tours = Array.from({ length: 12 });

function Tours() {
  return (
    <div className="px-32 py-6 flex flex-col gap-y-6 justify-center">
      <ToursHeader />
      <ToursGrid tours={tours} />
    </div>
  );
}

export default Tours;

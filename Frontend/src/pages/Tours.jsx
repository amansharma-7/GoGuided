import ToursHeader from "../components/tours/ToursHeader";
import ToursGrid from "../components/tours/ToursGrid";

function Tours() {
  return (
    <div className="px-32">
      <div className="flex flex-col justify-center p-3 shadow-sm bg-white rounded-lg h-[100vh]">
        <ToursHeader />
        <ToursGrid />
      </div>
    </div>
  );
}

export default Tours;

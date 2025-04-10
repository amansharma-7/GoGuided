import TourForm from "../../../common/TourForm";

export default function AddTour() {
  const handleAddTour = (newTourData) => {
    // console.log("New Tour Added:", newTourData);
    // Add logic to send data to the backend or update state
  };

  return <TourForm onSubmit={handleAddTour} />;
}

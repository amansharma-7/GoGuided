import { useParams } from "react-router";
import TourForm from "../../../../components/common/TourForm";

const sampleTourData = {
  name: "Mountain Adventure",
  location: "Himalayas",
  duration: "5 days",
  price: "1200",
  type: "Adventure",
  difficulty: "Intermediate",
  groupSize: "10",
  description: "An adventurous journey in the mountains",
  images: [], // You can include image files here if available
};

export default function EditTour() {
  const { name } = useParams();

  const handleEditTour = (updatedTourData) => {
    console.log("Tour Edited:", updatedTourData);
    // Update the tour data in the backend or state
  };

  return (
    <TourForm
      mode="edit"
      initialData={sampleTourData}
      onSubmit={handleEditTour}
    />
  );
}

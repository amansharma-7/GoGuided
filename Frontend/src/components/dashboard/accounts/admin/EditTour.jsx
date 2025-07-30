import { useEffect, useState } from "react";
import { useParams } from "react-router";
import TourForm from "../../../../components/common/TourForm";
import { getTourBySlug } from "../../../../services/tourService";
import useApi from "../../../../hooks/useApi";

export default function EditTour() {
  const { name } = useParams();
  const [tour, setTour] = useState();
  const { loading, error, request: fetchTourApi } = useApi(getTourBySlug);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchTourApi({ identifier: name });
        setTour(response.data.tour);
      } catch (err) {
        console.err(err);
      }
    })();
  }, [name]);

  if (loading) return <div className="p-6">Loading tour...</div>;
  if (error || !tour)
    return (
      <div className="p-6 text-red-500">Tour not found or failed to load.</div>
    );

  return <TourForm isEditTour={true} existingTour={tour} />;
}

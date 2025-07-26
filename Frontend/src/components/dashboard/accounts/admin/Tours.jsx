import { useEffect, useState } from "react";
import DashboardHeader from "../../../common/DashboardHeader";
import ToursList from "./ToursList";
import NoResult from "../../../../pages/NoResult";
import { getAllTours } from "../../../../services/tourService";
import useApi from "../../../../hooks/useApi";
import LoaderOverlay from "../../../common/LoaderOverlay";

function Tours() {
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    sortOrder: "asc",
    selectedFilters: [],
  });

  const [tours, setTours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTours, setTotalTours] = useState(0);
  const [loading, setLoading] = useState(true);
  const numberOfEntries = 10;

  const { loading: isLoading, request: fetchAllTours } = useApi(getAllTours);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchAllTours({});
        setTours(res?.data?.tours);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (isLoading || !tours) return <LoaderOverlay />;

  return (
    <div className="p-4 ">
      <DashboardHeader
        title="Tours"
        totalCount={tours.length}
        filterState={filterState}
        setFilterState={setFilterState}
        filterOptions={[
          {
            label: "Booking Status",
            children: [
              { label: "Upcoming", value: "upcoming" },
              { label: "Ongoing", value: "ongoing" },
              { label: "Cancelled", value: "cancelled" },
              { label: "Completed", value: "completed" },
            ],
          },

          {
            label: "Date Interval",
            children: [
              { label: "Start Date", value: "startDate", type: "date" },
              { label: "End Date", value: "endDate", type: "date" },
            ],
          },
        ]}
      />
      {tours.length > 0 ? <ToursList tours={tours} /> : <NoResult />}
    </div>
  );
}

export default Tours;

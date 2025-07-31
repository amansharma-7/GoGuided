import { useEffect, useState } from "react";
import ToursHeader from "../components/common/DashboardHeader";
import ToursGrid from "../components/tours/ToursGrid";
import NoResult from "./NoResult";
import LoaderOverlay from "../components/common/LoaderOverlay";
import { getAllToursAsCards } from "../services/tourService";
import useApi from "../hooks/useApi";

const filterOptions = [
  {
    label: "Tour Status",
    children: [
      { label: "Upcoming Tours", value: "upcoming" },
      { label: "Ongoing Tours", value: "ongoing" },
      { label: "Completed Tours", value: "completed" },
    ],
  },
  {
    label: "Difficulty Level",
    children: [
      { label: "Easy", value: "easy" },
      { label: "Moderate", value: "moderate" },
      { label: "Hard", value: "hard" },
    ],
  },
  {
    label: "Duration",
    children: [
      { label: "Short (1-7 Days)", value: "1-7" },
      { label: "Medium (7-15 Days)", value: "7-15" },
      { label: "Long (15+ Days)", value: "15+" },
    ],
  },

  {
    label: "Date Interval",
    children: [
      { label: "Start Date", value: "startDate", type: "date" },
      { label: "End Date", value: "endDate", type: "date" },
    ],
  },
];

function Tours() {
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    sortOrder: "asc",
    selectedFilters: [],
  });

  const [tours, setTours] = useState([]);

  const { loading: isLoading, request: fetchTours } =
    useApi(getAllToursAsCards);

  useEffect(() => {
    (async () => {
      try {
        const params = new URLSearchParams();

        const { searchQuery, selectedFilters, sortOrder } = filterState;

        if (searchQuery) {
          params.append("search", searchQuery);
        }

        if (selectedFilters) {
          if (selectedFilters["Date Interval"]) {
            const { startDate, endDate } = selectedFilters["Date Interval"];
            if (startDate) params.append("startDate", startDate);
            if (endDate) params.append("endDate", endDate);
          }
        }

        if (sortOrder) {
          params.append("sort", sortOrder);
        }

        // Example API call, replace with your actual method
        const response = await fetchTours({ params });

        setTours(response?.data?.tours);
      } catch (error) {}
    })();
  }, [filterState]);

  if (isLoading) return <LoaderOverlay />;

  if (!tours?.length)
    return (
      <div className="flex items-center justify-center h-[70vh] bg-white">
        <div className="bg-green-100 text-green-800 border border-green-300 rounded-lg px-6 py-4 text-lg font-medium shadow-md">
          Tours not Available
        </div>
      </div>
    );

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col justify-center p-3 shadow-sm bg-white rounded-lg">
        <ToursHeader
          title="Tours"
          totalCount={tours.length}
          filterState={filterState}
          setFilterState={setFilterState}
          filterOptions={filterOptions}
        />
        {tours.length > 0 ? <ToursGrid tours={tours} /> : <NoResult />}
      </div>
    </div>
  );
}

export default Tours;

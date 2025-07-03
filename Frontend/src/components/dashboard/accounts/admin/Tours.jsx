import { useEffect, useState } from "react";
import DashboardHeader from "../../../common/DashboardHeader";
import ToursList from "./ToursList";
import NoResult from "../../../../pages/NoResult";

const toursData = [
  {
    id: 1,
    name: "Forest Adventure",
    location: "Amazon Rainforest",
    duration: "5 days",
    price: "$500",
    type: "Adventure",
    difficulty: "Intermediate",
    groupSize: "10-15 people",
    description:
      "Explore the depths of the Amazon Rainforest with experienced guides.",
    startDate: "2025-04-01",
    endDate: "2025-04-06",
  },
  {
    id: 2,
    name: "Mountain Hiking",
    location: "Himalayas",
    duration: "7 days",
    price: "$800",
    type: "Hiking",
    difficulty: "Advanced",
    groupSize: "5-10 people",
    description:
      "Conquer the challenging trails of the Himalayas for an unforgettable experience.",
    startDate: "2025-06-10",
    endDate: "2025-06-17",
  },
  {
    id: 3,
    name: "Safari Exploration",
    location: "Serengeti",
    duration: "3 days",
    price: "$400",
    type: "Wildlife Safari",
    difficulty: "Easy",
    groupSize: "15-20 people",
    description:
      "Witness the stunning wildlife of the Serengeti on this guided safari.",
    startDate: "2025-03-25",
    endDate: "2025-03-28",
  },
];

function Tours() {
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    sortOrder: "asc",
    selectedFilters: [],
  });

  const [tours, setTours] = useState(toursData);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTours, setTotalTours] = useState(0);
  const [loading, setLoading] = useState(true);
  const numberOfEntries = 10;

  // useEffect(() => {
  //   const fetchTours = async () => {
  //     try {
  //       setLoading(true);
  //       const { searchQuery, selectedFilters, sortOrder } = filterState;
  //       const params = new URLSearchParams();

  //       if (searchQuery) {
  //         params.append("search", searchQuery);
  //       }

  //       if (selectedFilters && selectedFilters["Date Interval"]) {
  //         const { startDate, endDate } = selectedFilters["Date Interval"];
  //         if (startDate) params.append("startDate", startDate);
  //         if (endDate) params.append("endDate", endDate);
  //       }

  //       if (sortOrder) {
  //         params.append("sort", sortOrder);
  //       }

  //       params.append("page", currentPage);
  //       params.append("limit", numberOfEntries);

  //       // Fetching all tours
  //       const response = await getAllTours(user.token, params.toString());

  //       const { data } = response;

  //       setTours(data.tours); // assuming response structure has `tours`
  //       setTotalPages(response.totalPages);
  //       setTotalTours(response.total);
  //     } catch (error) {
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTours();
  // }, [currentPage, filterState]);

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

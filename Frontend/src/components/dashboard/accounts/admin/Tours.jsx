import { useEffect, useState } from "react";
import DashboardHeader from "../../../common/DashboardHeader";
import ToursList from "./ToursList";

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

  useEffect(() => {
    function fetchTours(query) {
      return toursData.filter(
        (tour) =>
          tour &&
          tour.name &&
          tour.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    const filteredTours = fetchTours(filterState.searchQuery);
    setTours(filteredTours);
  }, [filterState.searchQuery, filterState.selectedFilters]);

  const sortedTours = [...tours].sort((a, b) => {
    return filterState.sortOrder === "asc"
      ? new Date(a.startDate) - new Date(b.startDate)
      : new Date(b.startDate) - new Date(a.startDate);
  });

  return (
    <div className="p-4 h-full ">
      <DashboardHeader
        title="Tours"
        totalCount={sortedTours.length}
        filterState={filterState}
        setFilterState={setFilterState}
        filterOptions={[
          {
            label: "Category 1",
            children: [
              { label: "Option 1", value: "opt1" },
              { label: "Option 2", value: "opt2" },
            ],
          },
          {
            label: "Category 2",
            children: [
              { label: "Option A", value: "optA" },
              { label: "Option B", value: "optB" },
            ],
          },
        ]}
      />

      <ToursList tours={sortedTours} />
    </div>
  );
}

export default Tours;

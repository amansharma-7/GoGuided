import ReviewsHeader from "../../../common/DashboardHeader";
import ReviewsTable from "../../../dashboard/Table";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";

const reivewsData = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  name: ["John Doe", "Jane Smith", "Sam Wilson", "Lucy Heart"][i % 4],
  email: [
    "john@example.com",
    "jane@example.com",
    "sam@example.com",
    "lucy@example.com",
  ][i % 4],
  date: `2024-03-${(i % 30) + 1}`.padStart(10, "0"),
  rating:
    i % 2 === 0 ? (
      <StarRatings
        rating={5}
        starRatedColor="#FFD700"
        numberOfStars={5}
        starDimension="18px"
        starSpacing="2px"
      />
    ) : (
      <StarRatings
        rating={4}
        starRatedColor="#FFD700"
        numberOfStars={5}
        starDimension="18px"
        starSpacing="2px"
      />
    ),
}));

const headers = [
  { label: "S No.", width: "10%" },
  { label: "Name", width: "25%" },
  { label: "Email", width: "25%" },
  { label: "Date ", width: "20%" },
  { label: "Rating", width: "20%" },
];

function Reviews() {
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    sortOrder: "asc",
    selectedFilters: [],
  });

  const [reviews, setReviews] = useState(reivewsData);

  useEffect(() => {
    function fetchReviews(query) {
      return reivewsData.filter(
        (review) =>
          review &&
          review.name &&
          review.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    const filteredReviews = fetchReviews(filterState.searchQuery);
    setReviews(filteredReviews);
  }, [filterState.searchQuery, filterState.selectedFilters]);

  const sortedReviews = [...reviews].sort((a, b) => {
    return filterState.sortOrder === "asc"
      ? new Date(a.startDate) - new Date(b.startDate)
      : new Date(b.startDate) - new Date(a.startDate);
  });

  return (
    <div>
      <ReviewsHeader
        title="Reviews"
        totalCount={sortedReviews.length}
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

      <ReviewsTable headers={headers} data={sortedReviews} itemsPerPage={9} />
    </div>
  );
}

export default Reviews;

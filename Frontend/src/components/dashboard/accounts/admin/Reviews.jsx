import ReviewsHeader from "../../../common/DashboardHeader";
import ReviewsTable from "../../../dashboard/Table";
import { useEffect, useState } from "react";
import NoResult from "../../../../pages/NoResult";

const reivewsData = Array.from({ length: 50 }, (_, i) => ({
  _id: (i + 1).toString(),
  name: ["John Doe", "Jane Smith", "Sam Wilson", "Lucy Heart"][i % 4],
  email: [
    "john@example.com",
    "jane@example.com",
    "sam@example.com",
    "lucy@example.com",
  ][i % 4],
  date: `2024-03-${(i % 30) + 1}`.padStart(10, "0"),
  rating: [4, 5, 4.5][i % 3],
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

  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const numberOfEntries = 10;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Example: you might have filters, sortOrder etc from filterState
        // const { searchQuery, selectedFilters, sortOrder } = filterState;
        // const params = new URLSearchParams();

        // if (searchQuery) params.append("search", searchQuery);
        // if (selectedFilters) {
        //   if (selectedFilters["Date Interval"]) {
        //     const { startDate, endDate } = selectedFilters["Date Interval"];
        //     if (startDate) params.append("startDate", startDate);
        //     if (endDate) params.append("endDate", endDate);
        //   }
        // }
        // if (sortOrder) params.append("sort", sortOrder);

        // params.append("page", currentPage);
        // params.append("limit", numberOfEntries);

        // Fetch reviews instead of users or bookings
        // const response = await getAllReviews(user.token, params.toString());

        // const { data, totalPages: tp, total } = response;

        setReviews(reivewsData); // replace with actual fetched data
        setTotalPages(tp || 1);
        setTotalReviews(total || 0);
        setLoading(false);
      } catch (error) {
        // handle error here (optional)
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [currentPage, filterState]);

  const getKeyFromLabel = (label) =>
    label.toLowerCase().replace(/\s+/g, "").replace(/\./g, "");

  const transformedReviews = reviews.map((review, idx) => {
    const row = {};
    headers.forEach((header, i) => {
      const key = getKeyFromLabel(header.label);

      if (key === "sno") {
        row[key] = (currentPage - 1) * numberOfEntries + idx + 1;
      } else if (key === "date") {
        row[key] = new Date(review.date).toLocaleDateString();
      } else {
        // Here, access review[key], fallback to "-" if no value
        row[key] = review[key] || "-";
      }
    });

    row._id = review._id;
    return row;
  });

  return (
    <div>
      <ReviewsHeader
        title="Reviews"
        totalCount={transformedReviews.length}
        filterState={filterState}
        setFilterState={setFilterState}
        filterOptions={[
          {
            label: "Rating",
            children: [
              { label: "Above 1", value: "above_1" },
              { label: "Above 2", value: "above_2" },
              { label: "Above 3", value: "above_3" },
              { label: "Above 4", value: "above_4" },
            ],
          },
          {
            label: "Tour",
            children: [
              { label: "tour1", value: "tour1" },
              { label: "tour2", value: "tour2" },
              { label: "tour3", value: "tour3" },
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
      {transformedReviews.length > 0 ? (
        <ReviewsTable
          headers={headers}
          data={transformedReviews}
          itemsPerPage={9}
        />
      ) : (
        <NoResult />
      )}
    </div>
  );
}

export default Reviews;

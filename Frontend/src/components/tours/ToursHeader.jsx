import { useState } from "react";
import DashboardHeader from "../common/DashboardHeader";

function ToursHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedFilters, setSelectedFilters] = useState({});

  return (
    <DashboardHeader
      title="Tours"
      totalCount={100}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      setSortOrder={setSortOrder}
      sortOrder={sortOrder}
      selectedFilters={selectedFilters}
      setSelectedFilters={setSelectedFilters}
      filterOptions={[
        {
          label: "Difficulty",
          children: [
            { label: "Easy", value: "easy" },
            { label: "Medium", value: "medium" },
            { label: "Hard", value: "hard" },
          ],
        },
        {
          label: "",
          children: [
            { label: "Option A", value: "optA" },
            { label: "Option B", value: "optB" },
          ],
        },
      ]}
    />
  );
}

export default ToursHeader;

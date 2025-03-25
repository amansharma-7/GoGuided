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
  );
}

export default ToursHeader;

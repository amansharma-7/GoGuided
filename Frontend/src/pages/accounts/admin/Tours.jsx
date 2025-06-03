import { useState } from "react";
import DashboardHeader from "../../../components/DashboardHeader";

function Tours() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedFilters, setSelectedFilters] = useState({});

  const headerRes = {
    query: searchQuery,
    sortOrder,
    filters: { ...selectedFilters },
  };

  console.log(headerRes);

  return (
    <div className="p-4">
      <DashboardHeader
        title="Tours"
        totalCount={30}
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
    </div>
  );
}

export default Tours;

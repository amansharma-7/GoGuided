import UsersHeader from "../../../common/DashboardHeader";
import UsersTable from "../../../dashboard/Table";
import { useEffect, useState } from "react";
import NoResult from "../../../../pages/NoResult";
const headers = [
  { label: "S No.", width: "10%" },
  { label: "Name", width: "20%" },
  { label: "Email", width: "25%" },
  { label: "Number", width: "25%" },
  { label: "Last Visit", width: "20%" },
];

const usersData = Array.from({ length: 50 }, (_, i) => ({
  _id: (i + 1).toString(),
  name: ["John Doe", "Jane Smith", "Sam Wilson", "Lucy Heart"][i % 4],
  email: [
    "john@example.com",
    "jane@example.com",
    "sam@example.com",
    "lucy@example.com",
  ][i % 4],
  number: ["1234567890", "9876543210", "4561237890", "7894561230"][i % 4],
  lastVisit: `2024-03-${(i % 30) + 1}`.padStart(10, "0"),
}));

function UsersList() {
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    sortOrder: "asc",
    selectedFilters: [],
  });

  const [users, setUsers] = useState(usersData);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const numberOfEntries = 10;

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const { searchQuery, selectedFilters, sortOrder } = filterState;
  //       const params = new URLSearchParams();

  //       if (searchQuery) {
  //         params.append("search", searchQuery);
  //       }

  //       if (selectedFilters) {
  //         if (selectedFilters["Date Interval"]) {
  //           const { startDate, endDate } = selectedFilters["Date Interval"];
  //           if (startDate) params.append("startDate", startDate);
  //           if (endDate) params.append("endDate", endDate);
  //         }
  //       }

  //       if (sortOrder) {
  //         params.append("sort", sortOrder);
  //       }

  //       params.append("page", currentPage);
  //       params.append("role", "user");
  //       params.append("limit", numberOfEntries);

  //       // getting all users
  //       const response = await getAllUsers(user.token, params.toString());

  //       const { data } = response;

  //       setUsers(data.users);
  //       setTotalPages(response.totalPages);
  //       setTotalUsers(response.total);
  //       setLoading(false);
  //     } catch (error) {
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUsers();
  // }, [currentPage, filterState]);

  const getKeyFromLabel = (label) =>
    label.toLowerCase().replace(/\s+/g, "").replace(/\./g, "");

  const transformedUsers = users.map((user, idx) => {
    const row = {};
    headers.forEach((header, i) => {
      const key = getKeyFromLabel(header.label);
      if (key === "sno") {
        row[key] = (currentPage - 1) * numberOfEntries + idx + 1;
      } else if (key === "lastvisit") {
        row[key] = new Date(user.lastVisit).toLocaleDateString();
      } else {
        row[key] = user[key] || "-";
      }
    });

    row._id = user._id;
    return row;
  });

  return (
    <div className="p-4">
      {/* Header Section */}
      <UsersHeader
        title="Users"
        totalCount={transformedUsers.length}
        filterState={filterState}
        setFilterState={setFilterState}
        filterOptions={[
          {
            label: "Status",
            children: [
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
              { label: "Suspended", value: "suspended" },
            ],
          },
        ]}
      />
      {transformedUsers.length > 0 ? (
        <UsersTable
          headers={headers}
          data={transformedUsers}
          itemsPerPage={9}
        />
      ) : (
        <NoResult />
      )}
    </div>
  );
}

export default UsersList;

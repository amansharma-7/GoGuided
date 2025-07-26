import React, { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaEnvelope,
  FaUserShield,
  FaUserSlash,
} from "react-icons/fa";
import AdminsHeader from "../../../common/DashboardHeader";
import { BiPlusCircle } from "react-icons/bi";
import useSafeNavigate from "../../../../utils/useSafeNavigate";

const demoAdmins = [
  {
    _id: "1",
    name: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    role: "admin",
    status: "Active",
    joinedAt: "2024-01-15T12:00:00Z",
  },
  {
    _id: "2",
    name: "Simran Kaur",
    email: "simran.kaur@example.com",
    role: "admin",
    status: "Active",
    joinedAt: "2023-11-22T09:30:00Z",
  },
  {
    _id: "3",
    name: "Ravi Sharma",
    email: "ravi.sharma@example.com",
    role: "admin",
    status: "Fired",
    joinedAt: "2024-03-05T08:45:00Z",
  },
];

const filterOptions = [
  {
    label: "Date Interval",
    children: [
      { label: "Start Date", value: "startDate", type: "date" },
      { label: "End Date", value: "endDate", type: "date" },
    ],
  },
];

function AllAdmins() {
  const navigate = useSafeNavigate();
  const [filterState, setFilterState] = useState({
    searchQuery: "",
    sortOrder: "asc",
    selectedFilters: {},
  });
  const [admins, setAdmins] = useState([]);
  const [expandedAdmin, setExpandedAdmin] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function fetchAdmins(query) {
      return demoAdmins.filter(
        (admin) =>
          !query ||
          admin.name.toLowerCase().includes(query.toLowerCase()) ||
          admin.email.toLowerCase().includes(query.toLowerCase())
      );
    }

    const filteredAdmins = fetchAdmins(filterState.searchQuery);
    setAdmins(filteredAdmins);
  }, [filterState.searchQuery, filterState.selectedFilters]);

  const sortedAdmins = [...admins].sort((a, b) => {
    return filterState.sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  // Handle "Fire Admin"
  const handleFireAdmin = async (adminId) => {};

  return (
    <div className="p-6 flex flex-col gap-4 h-full overflow-y-auto scrollbar-hide">
      {/* Header Section */}
      <AdminsHeader
        title="All Admins"
        totalCount={sortedAdmins.length}
        filterState={filterState}
        setFilterState={setFilterState}
        filterOptions={filterOptions}
      />

      {/* Add Admin CTA */}
      <div
        className="flex items-center justify-between p-4 bg-white border border-green-500 rounded-xl hover:bg-green-100 cursor-pointer transition-all"
        onClick={() => navigate("add-admin")}
      >
        <div className="flex items-center gap-2">
          <BiPlusCircle className="text-green-600 w-6 h-6" />
          <span className="text-green-700 font-semibold text-lg">
            Add New Admin
          </span>
        </div>
      </div>

      {/* Admins List */}
      {admins.length === 0 ? (
        <p className="text-green-700 text-center mt-10">No admins found.</p>
      ) : (
        sortedAdmins.map((admin) => (
          <div
            key={admin._id}
            className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-green-500 transition"
          >
            {/* Admin Name & Toggle */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-green-800 flex items-center gap-2">
                <FaUserShield className="text-green-600" />
                {admin.name}
              </h2>
              <button
                onClick={() =>
                  setExpandedAdmin(
                    expandedAdmin === admin._id ? null : admin._id
                  )
                }
                className="text-green-800 hover:text-green-600 transition"
              >
                {expandedAdmin === admin._id ? (
                  <FaChevronUp size={20} />
                ) : (
                  <FaChevronDown size={20} />
                )}
              </button>
            </div>

            {/* Email & Status */}
            <div className="flex flex-col md:flex-row justify-between text-green-800 mt-4 p-3 bg-green-50 border border-green-200 rounded-md shadow-sm">
              <p className="flex items-center gap-2">
                <FaEnvelope /> {admin.email}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="px-2 py-1 bg-purple-100 text-blue-700 border border-blue-400 rounded-md">
                  {admin.status}
                </span>
              </p>
            </div>

            {/* Expandable Info */}
            {expandedAdmin === admin._id && (
              <div className="grid grid-cols-2 gap-4 p-4 mt-3 bg-green-50 border border-green-200 rounded-lg text-green-800 shadow-sm">
                <p>
                  <strong>Phone:</strong> {admin.phone || "Not Provided"}
                </p>
                <p>
                  <strong>Role:</strong> {admin.role}
                </p>
                <p>
                  <strong>Joined:</strong>{" "}
                  {new Date(admin.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}

            {/* Fire Button */}
            <div className="mt-4">
              <button
                onClick={() => handleFireAdmin(admin._id)}
                disabled={loading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                }`}
              >
                <FaUserSlash />
                {loading ? "Processing..." : "Fire Admin"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AllAdmins;

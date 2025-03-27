import { useState } from "react";
import RefundsHeader from "../../../common/DashboardHeader";
import { FaCheck, FaChevronDown, FaChevronUp } from "react-icons/fa";
import ConfirmationModal from "../../../common/ConfirmationModal";
const refundList = [
  {
    id: "rfd001",
    customer: "John Doe",
    email: "john.doe@example.com",
    tour: "Safari Adventure",
    date: "2024-03-15",
    status: "Pending",
    message: "Requesting a refund due to an emergency cancellation.",
  },
  {
    id: "rfd002",
    customer: "Jane Smith",
    email: "jane.smith@example.com",
    tour: "Mountain Hike",
    date: "2024-03-10",
    status: "Completed",
    message: "Refund processed successfully.",
  },
  {
    id: "rfd003",
    customer: "Michael Johnson",
    email: "michael.johnson@example.com",
    tour: "Beach Holiday",
    date: "2024-03-18",
    status: "Pending",
    message: "The tour was canceled due to bad weather. Requesting a refund.",
  },
  {
    id: "rfd004",
    customer: "Emily Davis",
    email: "emily.davis@example.com",
    tour: "City Tour",
    date: "2024-03-05",
    status: "Completed",
    message: "Refund successfully credited to my account.",
  },
  {
    id: "rfd005",
    customer: "David Brown",
    email: "david.brown@example.com",
    tour: "Safari Adventure",
    date: "2024-03-20",
    status: "Pending",
    message: "Requesting a refund due to double booking.",
  },
  {
    id: "rfd006",
    customer: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    tour: "Mountain Hike",
    date: "2024-03-08",
    status: "Pending",
    message: "Need a refund as I was unable to attend the tour.",
  },
  {
    id: "rfd007",
    customer: "Chris Miller",
    email: "chris.miller@example.com",
    tour: "Beach Holiday",
    date: "2024-03-12",
    status: "Completed",
    message: "Received my refund. Thanks for the quick response!",
  },
  {
    id: "rfd008",
    customer: "Amanda Garcia",
    email: "amanda.garcia@example.com",
    tour: "City Tour",
    date: "2024-03-07",
    status: "Pending",
    message: "Requesting refund due to incorrect booking date.",
  },
  {
    id: "rfd009",
    customer: "Brian Martinez",
    email: "brian.martinez@example.com",
    tour: "Safari Adventure",
    date: "2024-03-14",
    status: "Completed",
    message: "Refund processed. Appreciate the support team’s help!",
  },
  {
    id: "rfd010",
    customer: "Olivia Anderson",
    email: "olivia.anderson@example.com",
    tour: "Mountain Hike",
    date: "2024-03-09",
    status: "Pending",
    message: "Requesting a refund as I had to reschedule my trip.",
  },
];

const Refunds = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [expandedRefund, setExpandedRefund] = useState(null);
  const [refunds, setRefunds] = useState(refundList);
  const [refundConfirm, setRefundConfirm] = useState({
    show: false,
    refundId: null,
  });

  const handleRefund = (id) => {
    setRefundConfirm({ show: true, refundId: id });
  };

  const confirmRefund = (id) => {
    setRefunds((prevRefunds) =>
      prevRefunds.map((refund) =>
        refund.id === id ? { ...refund, status: "Completed" } : refund
      )
    );
    setRefundConfirm({ show: false, refundId: null });
  };

  const cancelRefund = () => {
    setRefundConfirm({ show: false, refundId: null });
  };

  return (
    <div className="px-4 py-4 h-full overflow-y-auto scrollbar-hide">
      <RefundsHeader
        title="Refunds"
        totalCount={refunds.length}
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

      {refunds.map((refund) => (
        <div
          key={refund.id}
          className="bg-white rounded-2xl shadow-lg p-6 border-t-2 border-white0"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-green-800 mb-2">
              {refund.customer} - {refund.tour}
            </h2>
            <button
              onClick={() =>
                setExpandedRefund(
                  expandedRefund === refund.id ? null : refund.id
                )
              }
              className="text-green-800 hover:text-green-600 transition cursor-pointer"
            >
              {expandedRefund === refund.id ? (
                <FaChevronUp size={20} />
              ) : (
                <FaChevronDown size={20} />
              )}
            </button>
          </div>

          <div className="flex justify-between text-green-800 bg-white p-3 rounded-md mb-4 shadow-sm">
            <p>
              <strong>Tour: </strong> {refund.tour}
            </p>
            <p>
              <strong>Status:</strong> {refund.status}
            </p>
          </div>

          {expandedRefund === refund.id && (
            <div className="grid grid-cols-1 gap-4 p-4 bg-white rounded-md shadow-sm">
              <p className="font-normal text-green-700">
                <strong>Message:</strong> {refund.message}
              </p>
              <p className="font-normal text-green-700">
                <strong>Email:</strong> {refund.email}
              </p>
              <p className="font-normal text-green-700">
                <strong>Date:</strong> {refund.date}
              </p>
            </div>
          )}

          <button
            onClick={() => handleRefund(refund.id)}
            disabled={refund.status === "Completed"}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
              refund.status === "Completed"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 cursor-pointer"
            }`}
          >
            <FaCheck size={16} />{" "}
            {refund.status === "Completed" ? "Approved" : "Approve Refund"}
          </button>
        </div>
      ))}
      {refundConfirm.show && (
        <ConfirmationModal
          text={"Are you sure you want to refund this payment?"}
          onConfirm={() => confirmRefund(refundConfirm.refundId)}
          onCancel={cancelRefund}
        />
      )}
    </div>
  );
};

export default Refunds;

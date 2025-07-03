import { useParams } from "react-router";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { initiateRazorpayPayment } from "../../../utils/razorpay";

const tourData = {
  basePrice: 200,
  availableSlots: 5,
  insuranceFee: 20,
};

const user = {
  name: "Sudhir Sharma",
  email: "Sudhirtemp123@gmail.com",
  phone: 9796971234,
};

const BookTourForm = () => {
  const { id } = useParams(); // tour name

  const [members, setMembers] = useState([]);
  const [insurance, setInsurance] = useState(false);

  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const addMember = () => {
    // Prevent adding if max slots reached
    if (members.length >= tourData.availableSlots) {
      toast.error("No more slots available.");
      return;
    }

    // Validate the last member if one exists
    const lastMember = members[members.length - 1];
    const isLastIncomplete =
      lastMember &&
      (!lastMember.name.trim() || !lastMember.age || !lastMember.gender);

    if (isLastIncomplete) {
      toast.warning(
        "Please complete the last member's details before adding another."
      );
      return;
    }

    setMembers([...members, { name: "", age: "", gender: "" }]);
  };

  const removeMember = (index) => {
    const updated = [...members];
    updated.splice(index, 1);
    setMembers(updated);
  };

  const totalCost =
    members.length * tourData.basePrice +
    (insurance ? members.length * tourData.insuranceFee : 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (members.length === 0) {
      toast.warning("Please add at least one member");
      return;
    }

    try {
      const paymentSuccess = await initiateRazorpayPayment({
        amount: totalCost,
        currency: "INR",
        tour: {
          _id: "abcd123",
          name: "Kedarnath Trek",
          price: 5999,
        },
      });
    } catch (error) {
      toast.error("Something went wrong during booking.");
    }
  };

  return (
    <div className="max-w-3xl min-h-[70vh] mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md mt-10">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4 sm:gap-0">
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-1">
            Add Members
          </h2>
          <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium shadow-sm">
            {tourData.availableSlots - members.length} slots left
          </span>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-green-700 font-semibold">Price per Person:</p>
          <p className="text-xl font-bold text-green-600">
            {tourData.basePrice}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Member List */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-green-600">
              Member Details
            </h3>
            <button
              type="button"
              onClick={addMember}
              className="text-green-600 flex items-center gap-1 hover:underline cursor-pointer"
            >
              <FaPlus /> Add Member
            </button>
          </div>

          {members.map((member, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3 items-end"
            >
              <input
                type="text"
                placeholder="Name"
                value={member.name}
                onChange={(e) =>
                  handleMemberChange(index, "name", e.target.value)
                }
                className="p-2 border rounded-md focus:ring-green-500 focus:border-green-500 w-full"
                required
              />
              <input
                type="number"
                placeholder="Age"
                value={member.age}
                onChange={(e) =>
                  handleMemberChange(index, "age", e.target.value)
                }
                className="p-2 border rounded-md focus:ring-green-500 focus:border-green-500 w-full"
                required
              />
              <div className="flex items-center gap-2 w-full">
                <select
                  value={member.gender}
                  onChange={(e) =>
                    handleMemberChange(index, "gender", e.target.value)
                  }
                  className="p-2 border rounded-md focus:ring-green-500 focus:border-green-500 w-full"
                  required
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeMember(index)}
                  className="text-red-500 hover:text-red-700 cursor-pointer p-2"
                  aria-label="Remove member"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Insurance */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={insurance}
              onChange={(e) => setInsurance(e.target.checked)}
              className="text-green-600 cursor-pointer"
            />
            Add Travel Insurance (${tourData.insuranceFee} per person)
          </label>
        </div>

        {/* Total */}
        <div className="text-right">
          <p className="text-lg font-semibold">
            Total: <span className="text-green-700">${totalCost}</span>
          </p>
        </div>

        <button
          type="submit"
          disabled={totalCost === 0}
          className="p-4 w-full text-lg uppercase text-white bg-green-600 rounded-md 
          hover:bg-green-700 hover:shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Pay & Book Tour
        </button>
      </form>
    </div>
  );
};

export default BookTourForm;

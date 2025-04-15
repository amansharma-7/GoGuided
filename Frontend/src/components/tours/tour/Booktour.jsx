import { useParams } from "react-router";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import PaymentPage from "../../common/PaymentPage";

// Example tourData (you can fetch this from API too)
const tourData = {
  basePrice: 200,
  availableSlots: 5,
  insuranceFee: 20,
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
    if (members.length < tourData.availableSlots) {
      setMembers([...members, { name: "", age: "", gender: "" }]);
    } else {
      alert("No more slots available");
    }
  };

  const removeMember = (index) => {
    const updated = [...members];
    updated.splice(index, 1);
    setMembers(updated);
  };

  const totalCost =
    members.length * tourData.basePrice +
    (insurance ? members.length * tourData.insuranceFee : 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("sudhir");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-1">
            Add Members
          </h2>
          <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium shadow-sm">
            {tourData.availableSlots - members.length} slots left
          </span>
        </div>
        <div className="text-right">
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
            <div key={index} className="grid grid-cols-3 gap-4 mb-3 items-end">
              <input
                type="text"
                placeholder="Name"
                value={member.name}
                onChange={(e) =>
                  handleMemberChange(index, "name", e.target.value)
                }
                className="p-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                required
              />
              <input
                type="number"
                placeholder="Age"
                value={member.age}
                onChange={(e) =>
                  handleMemberChange(index, "age", e.target.value)
                }
                className="p-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                required
              />
              <div className="flex items-center gap-2">
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
                  className="text-red-500 hover:text-red-700 cursor-pointer"
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
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition cursor-pointer"
        >
          Confirm Booking
        </button>
        <PaymentPage />
      </form>
    </div>
  );
};

export default BookTourForm;

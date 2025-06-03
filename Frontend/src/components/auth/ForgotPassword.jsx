import { useState } from "react";

function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    // Simulate sending a reset link
    console.log("Reset link sent to:", email);

    setSuccessMsg("Password reset link sent to your email.");
    setTimeout(() => {
      setSuccessMsg("");
      setEmail("");
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-green-900">
          Forgot Password
        </h3>
        {successMsg ? (
          <p className="text-green-600 text-sm mb-4">{successMsg}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label>
              <p className="text-green-950 mb-1">Enter your registered email</p>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-black rounded-lg p-2 focus:outline-none focus:border-2 text-green-950"
                required
              />
            </label>
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm rounded-lg bg-gray-300 hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm rounded-lg bg-green-500 cursor-pointer hover:bg-green-600 text-black font-semibold"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordModal;

import api from "./apiClient";

export const getUserBookings = async () => {
  return await api.get("/booking/");
};

export const cancelBookingById = async ({ identifier: bookingId }) => {
  return await api.patch(`/booking/cancel/${bookingId}`);
};

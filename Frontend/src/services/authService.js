import api from "./apiClient";

export const sendOtp = async ({ data }) => {
  return await api.post("/auth/send-otp", data);
};

export const registerUser = async ({ data }) => {
  return await api.post("/auth/register", data);
};

export const forgotPassword = async ({ data }) => {
  return await api.patch("/auth/forgot-password", data);
};
export const resetPassword = async ({ params, data }) => {
  return await api.patch("/auth/reset-password", data, { params });
};

export const loginUser = async ({ data }) => {
  return await api.post("/auth/login", data);
};

export const getMe = async () => {
  return await api.get("/auth/me");
};

export const logoutUser = async () => {
  return await api.post("/auth/logout");
};

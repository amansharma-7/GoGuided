import api from "./apiClient";

export const registerUser = async ({ data }) => {
  return await api.post("/auth/register", data);
};

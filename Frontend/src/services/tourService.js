import api from "./apiClient";

export const createTour = async ({ data }) => {
  return await api.post("tour/create", data);
};

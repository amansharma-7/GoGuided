import api from "./apiClient";

export const createTour = async ({ data }) => {
  return await api.post("tour/create", data);
};
export const updateTour = async ({ data }) => {
  return await api.post("tour/update", data);
};

export const getAllTours = async () => {
  return await api.get("tour");
};

export const getAllToursAsCards = async ({ params }) => {
  return await api.get("tour/cards", { params });
};

export const getTourBySlug = async ({ identifier }) => {
  return await api.get(`tour/${identifier}`);
};

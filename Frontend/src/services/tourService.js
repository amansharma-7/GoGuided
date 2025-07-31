import api from "./apiClient";

export const createTour = async ({ data }) => {
  return await api.post("tour/create", data);
};

export const getAllTours = async ({ params }) => {
  return await api.get("tour", { params });
};

export const getAllToursAsCards = async ({ params }) => {
  return await api.get("tour/cards", { params });
};

export const getTourBySlug = async ({ identifier }) => {
  return await api.get(`tour/${identifier}`);
};

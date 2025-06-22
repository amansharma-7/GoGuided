import axios from "../apiConnector";
export const getTour = ({ identifier }) => axios.get(`/tours/${identifier}`);

export const createTour = ({ data }) => axios.post("/tours", data);

export const updateTour = ({ identifier, data }) =>
  axios.put(`/tours/${identifier}`, data);

export const deleteTour = ({ identifier }) =>
  axios.delete(`/tours/${identifier}`);

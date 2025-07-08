import api from "./apiClient";

export const createJob = async ({ data }) => {
  return await api.post("/job/create-job", data);
};

export const getAllJobs = async () => {
  return await api.get("/job/get-jobs");
};

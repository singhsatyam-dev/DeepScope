import api from "./api";

// Create a new research report
export const createResearchRequest = async (question) => {
  const response = await api.post("/research", { question });
  return response.data.data;
};

// Fetch all research records
export const fetchResearchesRequest = async () => {
  const response = await api.get("/research");
  return response.data.data;
};

// Fetch one research report
export const fetchResearchByIdRequest = async (id) => {
  const response = await api.get(`/research/${id}`);
  return response.data.data;
};

// Delete a research record
export const deleteResearchRequest = async (id) => {
  const response = await api.delete(`/research/${id}`);
  return response.data;
};

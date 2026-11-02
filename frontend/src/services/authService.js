import api from "./api";

export const registerRequest = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data.data;
};

export const loginRequest = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data.data;
};

export const logoutRequest = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getCurrentUserRequest = async () => {
  const response = await api.get("/auth/me");
  return response.data.data;
};

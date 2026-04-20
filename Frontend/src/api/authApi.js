import axiosInstance from "./axiosInstance";

export const registerApi = async (userData) => {
  const response = await axiosInstance.post("/auth/signup", userData);
  return response.data;
};

export const loginApi = async (credentials) => {
  const response = await axiosInstance.post("/auth/signin", credentials);
  return response.data;
};

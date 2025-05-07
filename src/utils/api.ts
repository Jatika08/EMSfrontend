import axiosInstance from "./axiosInstance";

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post("/users/login", data);
  return response.data;
};

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.patch("/users/register", data);
  return response.data;
};

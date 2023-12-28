import { axiosClient } from "@/config/axiosClient";

export const login = async ({ email, password }) => {
  const { data } = await axiosClient.post("/users/login", { email, password });
  return data;
};
import { axiosClient } from "@/config/axiosClient";

export const forgotPassword = async ({ email }) => {
  const { data } = await axiosClient.post("/users/forgot-password", { email });
  return data;
};
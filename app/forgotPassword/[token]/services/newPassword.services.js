import { axiosClient } from "@/config/axiosClient";

export const checkToken = async (token) => {
  const { data } = await axiosClient(`/users/forgot-password/${token}`);
  return data;
};

export const changePassword = async (token, newPassword) => {
    const { data } = await axiosClient.post(`/users/forgot-password/${token}`, {newPassword});
    return data;
  };
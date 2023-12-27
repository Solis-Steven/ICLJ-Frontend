import axiosClient from "@/config/axiosClient";

export const getAllMembers = async () => {
    const { data } = await axiosClient.get("/users");
    return data;
  };
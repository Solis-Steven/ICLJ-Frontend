import { axiosClient } from "@/config/axiosClient";

export const register = async (formData) => {
    console.log("data", formData)
    const { data } = await axiosClient.post("/users", formData);
    return data;
};
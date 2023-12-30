import { axiosClient } from "@/config/axiosClient";

export const register = async (formData) => {
    const { data } = await axiosClient.post("/users", formData);
    
    return data;
};
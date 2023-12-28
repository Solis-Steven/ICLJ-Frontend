import { axiosClient } from "@/config/axiosClient";

export const confirmAccount = async (token) => {
    const { data } = await axiosClient(`/users/confirm/${token}`);
    
    return data;
}
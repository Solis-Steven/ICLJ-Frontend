import { axiosClient } from "@/config/axiosClient";
import { getToken } from "@/utilities/getToken";

export const addSermon = async (sermonData) => {
    try {
        const config = getToken()
        
        const { data } = await axiosClient.post("/sermons", sermonData, config);
      
        return data;
    } catch (error) {
        console.log(error)
    }
};
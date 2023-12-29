import { axiosClient } from "@/config/axiosClient";
import { getToken } from "@/utilities/getToken";

export const addTestimonial = async (testimonialData) => {
    try {
        const config = getToken()
        
        const { data } = await axiosClient.post("/testimonials", testimonialData, config);
      
        return data;
    } catch (error) {
        console.log(error)
    }
};
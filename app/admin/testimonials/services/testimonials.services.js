import { axiosClient } from "@/config/axiosClient";
import { getToken } from "@/utilities/getToken";

export const getAllTestimonials = async () => {
  try {
    
    const config = getToken()

    const { data } = await axiosClient("/testimonials", config);

    return(data);
  } catch (error) {
    console.log("Error al obtener testimonios")
  }
};

export const deleteTestimonial = async (id) => {
  try {
    
    const config = getToken()

    const { data } = await axiosClient.delete(`/testimonials/${id}`, config);

    return(data);
  } catch (error) {
    console.log("Error al obtener testimonios")
  }
};
import { axiosClient } from "@/config/axiosClient";
import { getToken } from "@/utilities/getToken";

export const getAllTestimonials = async ({ page = 1, limit = 10 }) => {
  try {
    const { data } = await axiosClient(`/testimonials?page=${page}&limit=${limit}`);

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
import { axiosClient } from "@/config/axiosClient";
import { getToken } from "@/utilities/getToken";

export const getTestimonial = async (id) => {
  try {
    
    const config = getToken()

    const { data } = await axiosClient(`/testimonials/${id}`, config);

    return(data);
  } catch (error) {
    console.log("Error al obtener testimonio")
  }
};

export const updateTestimonial = async (id, testimonial) => {
  try {
    
    const config = getToken()

    const { data } = await axiosClient.put(`/testimonials/${id}`, testimonial, config);

    return(data);
  } catch (error) {
    console.log("Error al editar testimonio")
  }
};
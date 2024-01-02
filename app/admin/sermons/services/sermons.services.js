import { axiosClient } from "@/config/axiosClient";
import { getToken } from "@/utilities/getToken";

export const getAllSermons = async () => {
  try {
    
    const config = getToken()

    const { data } = await axiosClient("/sermons", config);

    return(data);
  } catch (error) {
    console.log("Error al obtener testimonios")
  }
};

export const deleteSermon = async (id) => {
  try {
    
    const config = getToken()

    const { data } = await axiosClient.delete(`/sermons/${id}`, config);

    return(data);
  } catch (error) {
    console.log("Error al obtener testimonios")
  }
};
import { axiosClient } from "@/config/axiosClient";
import { getToken } from "@/utilities/getToken";

export const getSermon = async (id) => {
  try {
    const { data } = await axiosClient(`/sermons/${id}`);

    return(data);
  } catch (error) {
    console.log("Error al obtener sermon")
  }
};

export const updateSermon = async (id, sermon) => {
  try {
    
    const config = getToken()

    const { data } = await axiosClient.put(`/sermons/${id}`, sermon, config);

    return(data);
  } catch (error) {
    console.log("Error al editar sermon")
  }
};
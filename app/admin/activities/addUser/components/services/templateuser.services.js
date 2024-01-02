import { axiosClient } from "@/config/axiosClient";
import { getToken } from "@/utilities/getToken";

export const getActivitie = async (id) => {
    try {
      
      const config = getToken()
  
      const { data } = await axiosClient(`/activities/${id}`, config);
  
      return(data);
    } catch (error) {
      console.error("")
    }
  };
  
  export const updateActivitie = async (id, activitie) => {
    try {
      
      const config = getToken()
  
      const { data } = await axiosClient.put(`/activities/${id}`, activitie, config);
  
      return(data);
    } catch (error) {
      console.log("Error al editar actividad")
    }
  };
  export const deleteActivitie = async (id) => {
    try {
      
      const config = getToken()
  
      const { data } = await axiosClient.delete(`/activities/${id}`, config);
  
      return(data);
    } catch (error) {
      console.log("Error al eliminar actividad")
    }
  };
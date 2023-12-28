import { axiosClient } from "@/config/axiosClient";
import { getToken } from "@/utilities/getToken";

export const getAllMembers = async () => {
  try {
    
    const config = getToken()

    const { data } = await axiosClient("/users", config);

    return(data);
  } catch (error) {
    console.log("Error al obtener miembros")
  }
};

export const deleteMember = async () => {
  try {
    
    const config = getToken()
  
    const { data } = await axiosClient("/users", config);

    return(data);
  } catch (error) {
    console.log("Error al obtener miembros")
  }
}
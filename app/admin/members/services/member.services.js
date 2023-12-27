import { axiosClient } from "@/config/axiosClient";

export const getAllMembers = async () => {
  try {
    
    const token = localStorage.getItem("token");
  
    if (!token) {
      return;
    }
  
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await axiosClient("/users", config);

    return(data);
  } catch (error) {
    console.log("Error al obtener miembros")
  }
};
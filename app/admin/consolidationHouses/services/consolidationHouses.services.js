import { axiosClient } from "@/config/axiosClient";
//Obtener todas las casas de consolidación
export const getAllConsolidationHouses = async () => {
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
    const { data } = await axiosClient("consolidationHouses", config);

    return (data);
  } catch (error) {
    console.log("Error al obtener casas de consolidation")
  }
};
export const deleteConsolidationHouseById = async (consolidationHouseId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    // Modifica la URL según tu implementación
    const url = `consolidationHouses/${consolidationHouseId}`;

    const response = await axiosClient.delete(url, config)

    // Puedes retornar la respuesta si lo necesitas
    return response.data;
  } catch (error) {
    console.error("Error al eliminar casa de consolidación:", error.message);
    throw error;
  }
};
export const CreateConsolidationHouse = async ({ name, leader, date, address  }) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token not found");
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };

    // Modifica la URL según tu implementación
    
   
    const { data } = await axiosClient.post("/consolidationHouses", { name, leader, date, address  }, config);
    // Puedes retornar la respuesta si lo necesitas
    return data;

    // Puedes retornar la respuesta si lo necesitas
  } catch (error) {
    console.error("Error al agregar casa de consolidación:", error.message);
    throw error;
  }
};
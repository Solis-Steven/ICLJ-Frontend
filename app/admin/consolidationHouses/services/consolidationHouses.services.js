import { axiosClient } from "@/config/axiosClient";
import { getToken } from "@/utilities/getToken";
//Obtener todas las casas de consolidación
export const getAllConsolidationHouses = async () => {
  try {

    const config = getToken()
    const { data } = await axiosClient("consolidationHouses", config);

    return (data);
  } catch (error) {
    console.log("Error al obtener casas de consolidation")
  }
};
export const deleteConsolidationHouseById = async (consolidationHouseId) => {
  try {
    const config = getToken()

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
    const config = getToken()
    // Modifica la URL según tu implementación
    const isoDate = new Date(date).toISOString();
    const { data } = await axiosClient.post("/consolidationHouses", { name, leader, date: isoDate, address  }, config);
    // Puedes retornar la respuesta si lo necesitas
    return data;

    // Puedes retornar la respuesta si lo necesitas
  } catch (error) {
    console.error("Error al agregar casa de consolidación:", error.message);
    throw error;
  }
};
export const getConsolidationHouseById = async (consolidationHouseId) => {
  try {
    const config = getToken()

    // Modifica la URL según tu implementación
    const url = `consolidationHouses/${consolidationHouseId}`;

    const response = await axiosClient.get(url, config)

    // Puedes retornar la respuesta si lo necesitas
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la casa de consolidación ${consolidationHouseId}:`, error.message);
    throw error;
  }
};
export const UpdateConsolidationHouseById = async (consolidationHouseId,{ name, leader, date, address }) => {
  try {
    const config = getToken()

    // Modifica la URL según tu implementación
    const url = `consolidationHouses/${consolidationHouseId}`;
    const isoDate = new Date(date).toISOString();
    const response = await axiosClient.put(url, { name, leader, date: isoDate, address  }, config)

    // Puedes retornar la respuesta si lo necesitas
    return response.data;
  } catch (error) {
    console.error("Error al actualizar casa de consolidación:", error.message);
    throw error;
  }
};
import { axiosClient } from "@/config/axiosClient";
import { getToken } from "@/utilities/getToken";
import {notifyError} from "@/utilities/notifyError";
//Obtener todas las casas de consolidación
export const getAllConsolidationHouses = async ({ page = 1, limit = 15 }) => {
  try {

    const config = getToken()
    const { data } = await axiosClient(`/consolidationHouses?page=${page}&limit=${limit}`, config);
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

    const {data} = await axiosClient.delete(url, config)

    // Puedes retornar la respuesta si lo necesitas
    return data;
  } catch (error) {
    notifyError(error.response?.data?.message)
    console.error("Error al eliminar casa de consolidación:", error.message);
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
    notifyError(error.response?.data?.message)
    console.error("Error al agregar casa de consolidación:", error.message);
  }
};
export const getConsolidationHouseById = async (consolidationHouseId) => {
  try {
    const config = getToken()

    // Modifica la URL según tu implementación
    const url = `consolidationHouses/${consolidationHouseId}`;

    const {data} = await axiosClient.get(url, config)

    // Puedes retornar la respuesta si lo necesitas
    return data;
  } catch (error) {
    notifyError(error.response?.data?.message)
    console.error(`Error al obtener la casa de consolidación ${consolidationHouseId}:`, error.message);
  }
};
export const UpdateConsolidationHouseById = async (consolidationHouseId,{ name, leader, date, address }) => {
  try {
    const config = getToken()

    // Modifica la URL según tu implementación
    const url = `consolidationHouses/${consolidationHouseId}`;
    const isoDate = new Date(date).toISOString();
    const {data} = await axiosClient.put(url, { name, leader, date: isoDate, address  }, config)

    // Puedes retornar la respuesta si lo necesitas
    return data;
  } catch (error) {
    notifyError(error.response?.data?.message)
    console.error("Error al actualizar casa de consolidación:", error.message);
  }
};
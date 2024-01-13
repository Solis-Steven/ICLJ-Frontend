import { axiosClient } from "@/config/axiosClient";
import { getToken } from "@/utilities/getToken";
import {notifyError} from "@/utilities/notifyError";
//Obtener todas las casas de consolidación
export const getAllInfantil = async ({ page = 1, limit = 15 }) => {
  try {

    const config = getToken()
    const { data } = await axiosClient(`/announcements?page=${page}&limit=${limit}`, config);
    return (data);
  } catch (error) {
    console.log("Error al obtener Anuncios escuela infantil")
  }
};
export const deleteAnnouncementById = async (announcementId) => {
  try {
    const config = getToken()

    // Modifica la URL según tu implementación
    const url = `announcements/${announcementId}`;

    const {data} = await axiosClient.delete(url, config)

    // Puedes retornar la respuesta si lo necesitas
    return data;
  } catch (error) {
    notifyError(error.response?.data?.message)
    console.error("Error al eliminar Anuncios escuela infantil:", error.message);
  }
};
export const CreateAnnouncement = async ({ name, description, date, image  }) => {
  try {
    const config = getToken()
    // Modifica la URL según tu implementación
    const isoDate = new Date(date).toISOString();
    const { data } = await axiosClient.post("/announcements", { name, description, date: isoDate, image  }, config);
    // Puedes retornar la respuesta si lo necesitas
    return data;

    // Puedes retornar la respuesta si lo necesitas
  } catch (error) {
    notifyError(error.response?.data?.message)
    console.error("Error al agregar anuncios escuela infantil:", error.message);
  }
};
export const getAnnouncementById = async (announcementId) => {
  try {
    const config = getToken()

    // Modifica la URL según tu implementación
    const url = `announcements/${announcementId}`;

    const {data} = await axiosClient.get(url, config)

    // Puedes retornar la respuesta si lo necesitas
    return data;
  } catch (error) {
    notifyError(error.response?.data?.message)
    console.error(`Error al obtener el anuncio escuela infantil ${consolidationHouseId}:`, error.message);
  }
};
export const UpdateAnnouncementById = async (announcementId,{ name, description, date, image }) => {
  try {
    const config = getToken()

    // Modifica la URL según tu implementación
    const url = `announcements/${announcementId}`;
    const isoDate = new Date(date).toISOString();
    const {data} = await axiosClient.put(url, { name, description, date: isoDate, image  }, config)

    // Puedes retornar la respuesta si lo necesitas
    return data;
  } catch (error) {
    notifyError(error.response?.data?.message)
    console.error("Error al actualizar anuncio escuela infantil:", error.message);
  }
};
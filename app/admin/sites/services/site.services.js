import { axiosClient } from "@/config/axiosClient";
import { getToken } from '@/utilities/getToken';

export const getAllSites = async () => {
  try {
    const config = getToken();
    const { data } = await axiosClient("/sites", config);
    return data;
  } catch (error) {
    console.error("Error al obtener sedes:", error);
  }
};
export const addSite = async (siteData) => {
  try {
    const config = getToken();
    const { data } = await axiosClient.post("/sites", siteData, config);
    return data;
  } catch (error) {
    console.error("Error al agregar sede:", error);
    throw error;
  }
};
export const editSite = async (site_id, updatedData) => {
  try {
    const config = getToken();
    const { data } = await axiosClient.put(`/sites/${site_id}`, updatedData, config);
    return data;
  } catch (error) {
    console.error("Error al editar sede:", error);
    throw error;
  }
};
export const deleteSite = async (site_id) => {
  try {
    const config = getToken();
    const { data } = await axiosClient.delete(`/sites/${site_id}`, config);
    return data;
  } catch (error) {
    console.error("Error al borrar sede:", error);
    throw error;
  }
};
import { axiosClient } from "@/config/axiosClient";
import { getConfigWithToken } from '../../services/api.utils';

export const getAllSites = async () => {
  try {
    const config = getConfigWithToken();
    const { data } = await axiosClient("/sites", config);
    return data;
  } catch (error) {
    console.error("Error al obtener sedes:", error);
  }
};
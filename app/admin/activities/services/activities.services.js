import { axiosClient } from "@/config/axiosClient";
import { getToken } from '@/utilities/getToken';

export const getAllActivities = async () => {
  try {
    const config = getToken();
    const { data } = await axiosClient("/activities", config);
    return data;
  } catch (error) {
    console.error("Error al obtener actividades:", error);
  }
};
export const agendActivitie = async (activitiesData) => {
  try {
    const config = getToken();
    const { data } = await axiosClient.post("/activities", activitiesData, config);
    return data;
  } catch (error) {
    console.error("Error al agendar actividad:", error);
    throw error;
  }
};
export const editActivitie = async (activitie_id, updatedData) => {
  try {
    const config = getToken();
    const { data } = await axiosClient.put(`/activities/${activitie_id}`, updatedData, config);
    return data;
  } catch (error) {
    console.error("Error al editar actividad:", error);
    throw error;
  }
};
export const getActivitie = async (id) => {
  try {
    
    const config = getToken()

    const { data } = await axiosClient(`/activities/${id}`, config);

    return(data);
  } catch (error) {
    console.error("")
  }
};
// export const deleteSite = async (site_id) => {
//   try {
//     const config = getConfigWithToken();
//     const { data } = await axiosClient.delete(`/sites/${site_id}`, config);
//     return data;
//   } catch (error) {
//     console.error("Error al borrar sede:", error);
//     throw error;
//   }
// };
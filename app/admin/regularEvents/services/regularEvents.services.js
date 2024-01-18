import { axiosClient } from "@/config/axiosClient";
import { getToken } from "@/utilities/getToken";
import {notifyError} from "@/utilities/notifyError";
export const getAllRegularEvents = async ({ page = 1, limit = 15 }) => {
    try {
      const { data } = await axiosClient(`/fixedEvent?page=${page}&limit=${limit}`);
      return (data);
    } catch (error) {
      console.log("Error al obtener los Eventos Fijos")
    }
  };
  export const CreateRegularEvent = async ({ name, manager, date, visible  }) => {
    try {
      const config = getToken()
      // Modifica la URL según tu implementación
      const isoDate = new Date(date).toISOString();
      const { data } = await axiosClient.post("/fixedEvent", { name, manager, date: isoDate, visible }, config);
      // Puedes retornar la respuesta si lo necesitas
      return data;
      // Puedes retornar la respuesta si lo necesitas
    } catch (error) {
      notifyError(error.response?.data?.message)
      console.error("Error al agregar evento fijo:", error.message);
    }
  };
  export const deleteRegularEventById = async (regularEventId) => {
    try {
      const config = getToken()
      // Modifica la URL según tu implementación
      const url = `fixedEvent/${regularEventId}`;
  
      const {data} = await axiosClient.delete(url, config)
  
      // Puedes retornar la respuesta si lo necesitas
      return data;
    } catch (error) {
      notifyError(error.response?.data?.message)
      console.error("Error al eliminar evento fijo:", error.message);
    }
  };
  export const UpdateRegularEventById = async (regularEventId,{ name, manager, date, visible }) => {
    try {
      const config = getToken()
  
      // Modifica la URL según tu implementación
      const url = `fixedEvent/${regularEventId}`;
      const isoDate = new Date(date).toISOString();
      const {data} = await axiosClient.put(url, { name, manager, date: isoDate, visible  }, config)
  
      // Puedes retornar la respuesta si lo necesitas
      return data;
    } catch (error) {
      notifyError(error.response?.data?.message)
      console.error("Error al actualizar evento fijo:", error.message);
    }
  };
import { axiosClient } from "@/config/axiosClient";
import { getToken } from "@/utilities/getToken";
import {notifyError} from "@/utilities/notifyError";

export const getAllmultimedia = async ({ page = 1, limit = 15 }) => {
  try {

    const { data } = await axiosClient(`/multimedia?page=${page}&limit=${limit}`);
    return (data);
  } catch (error) {
    console.log("Error al obtener multimedia")
  }
};
export const deleteMultimediaById = async (multimediaId) => {
  try {
    const config = getToken()

    // Modifica la URL según tu implementación
    const url = `multimedia/${multimediaId}`;

    const {data} = await axiosClient.delete(url, config)

    // Puedes retornar la respuesta si lo necesitas
    return data;
  } catch (error) {
    notifyError(error.response?.data?.message)
    console.error("Error al eliminar multimedia:", error.message);
  }
};
export const CreateMultimedia = async ({ name, ref, visible, type  }) => {
  try {
    const config = getToken();
    const { data } = await axiosClient.post("/multimedia", { name, ref, visible, type }, config);
    // Puedes retornar la respuesta si lo necesitas
    return data;

    // Puedes retornar la respuesta si lo necesitas
  } catch (error) {
    notifyError(error.response?.data?.message)
    console.error("Error al agregar archivo multimedia:", error.message);
  }
};
export const getMultimediaById = async (multimediaId) => {
  try {


    // Modifica la URL según tu implementación
    const url = `multimedia/${multimediaId}`;

    const {data} = await axiosClient.get(url)

    // Puedes retornar la respuesta si lo necesitas
    return data;
  } catch (error) {
    notifyError(error.response?.data?.message)
    console.error(`Error al obtener el archivo multimedia ${multimediaId}:`, error.message);
  }
};
export const UpdateMultimediaById = async (multimediaId,{ name, ref, visible, type }) => {
  try {
    const config = getToken()

    // Modifica la URL según tu implementación
    const url = `multimedia/${multimediaId}`;
    const {data} = await axiosClient.put(url, { name, ref, visible, type }, config)

    // Puedes retornar la respuesta si lo necesitas
    return data;
  } catch (error) {
    notifyError(error.response?.data?.message)
    console.error("Error al actualizar archivo multimedia:", error.message);
  }
};
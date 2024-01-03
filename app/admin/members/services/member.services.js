import { axiosClient } from "@/config/axiosClient";
import { getToken } from "@/utilities/getToken";
import { notifyError } from "@/utilities/notifyError";

export const getAllMembers = async ({ page = 1, limit = 10 }) => {
  try {
      const config = getToken();
      const { data } = await axiosClient(`/users?page=${page}&limit=${limit}`, config);
      return data;
  } catch (error) {
      console.log("Error al obtener miembros");
  }
};


export const deleteMember = async (id) => {
  try {
    
    const config = getToken()
  
    const { data } = await axiosClient.delete(`/users/delete/${id}`, config);

    return(data);
  } catch (error) {
    console.log("Error al eliminar miembro")
  }
}

export const addMember = async (member) => {
  try {
    const { data } = await axiosClient.post("/users", member);

    return(data);
  } catch (error) {
    notifyError(error.response?.data.msg)
    console.log("Error al agregar miembro", error)
  }
}

export const updateMember = async (id, member) => {
  try {
    const config = getToken()

    console.log(member)

    const { data } = await axiosClient.put(`/users/edit/${id}`, member, config);

    return(data);
  } catch (error) {
    notifyError(error.response?.data.msg)
    console.log("Error al editar miembro", error)
  }
}
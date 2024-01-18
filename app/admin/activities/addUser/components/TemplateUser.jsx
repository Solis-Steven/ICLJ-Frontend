import { DeleteButton } from '@/components/DeleteButton'
import React, { useState } from 'react';
import { editActivitie } from '../../services/activities.services';
import { notifySuccess } from '@/utilities/notifySuccess';
import { notifyError } from '@/utilities/notifyError';
import { useModal } from "@/hooks/useModal";

const TemplateUser = ({ user, activitie }) => {
  const [check, setCheck] = useState(false);

  const handleToggle = async () => {
    setCheck(!check);
    try {
      await editActivitie(activitie._id, {
        ...activitie,
        users: activitie.users.map(objeto => 
          objeto.name === user.name ? { ...objeto, assisted: !check } : objeto
        )
      });
  
      notifySuccess("Se cambio la asistencia correctamente");
    } catch (error) {
      notifyError(error.response.data.msg);
    }
  };

  const { 
      setDeleteModal
  } = useModal();
  
  const deleteElement = async () => {
    try {
      await editActivitie(activitie._id, {
        ...activitie,
        users: activitie.users.filter(objet => objet.name !== user.name || objet.phone !== user.phone)
      });
  
      notifySuccess(`${user.name} eliminado correctamente`);
    } catch (error) {
      notifyError(error.response.data.msg);
    }
  };

  const handleDeleteModal = () => {
    setDeleteModal(
      "Eliminar Usuario de la Actividad",                                                                                          
      "¿Estás seguro de que quieres eliminar este usuario?",
      () => deleteElement() 
    );
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-3 items-center 
    justify-between border-b-2 pb-3 mb-2">
      <div>
          <h1 className="font-bold text-1xl">{ user.name }</h1>
          <p>{user.phone}</p>
      </div>
      <div className="flex items-center gap-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span style={{ fontSize: '12px'}}>ASISTENCIA</span>
          <button style={{ marginRight: '40px' }}
                  className={`rounded-full w-6 h-6 border border-gray-300 flex items-center justify-center cursor-pointer focus:outline-none ${
                    user.assisted ? 'bg-blue-500 text-white border-blue-500' : ''
            }`}
            onClick={handleToggle}
          ></button>

          <DeleteButton deleteElement={handleDeleteModal}/>
      </div>
  </div>
  )
}

export default TemplateUser
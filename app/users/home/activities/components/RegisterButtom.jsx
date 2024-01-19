"use client"
import React, {useEffect, useState} from 'react'
import { useAuth } from "@/hooks/useAuth";
import { addUserActivitie } from '@/app/admin/activities/[id]/services/activitie.services';
import { notifySuccess } from '@/utilities/notifySuccess';
import { notifyError } from '@/utilities/notifyError';

export default function RegisterButtom({row}) {

    const [isRegistered, setIsRegistered] = useState(false);
    const { auth } = useAuth();

    useEffect(() => {
        const checkRegister = (row) => {
            const registered = row.users.some(user => user.name === auth?.name && user.phone === auth?.phone)
            setIsRegistered(registered)
        }
        if(auth){
            checkRegister(row)
        }
        
    },[row, auth])

    const handleRegisterUser = async (activity) => {
        if(isRegistered){
            notifyError("Ya estas registrado a este evento")
            return;
        }
        if(auth){
          try {
            await addUserActivitie(activity._id, {
              name: auth.name,
              phone: auth.phone
            });
            notifySuccess("Se ha registrado tu asistencia al evento")
            setIsRegistered(true);
          } catch (error) {
            console.log(error)
          }
    
        } else {
          router.push("/login")
        }
        
      };

  return (
    <button
        type="button"
        className={`text-white text-sm rounded-full ml-3 p-2
        ${isRegistered ? "bg-gray-500" : "bg-primary hover:bg-darkPrimary"}`}
        onClick={() => handleRegisterUser(row)}
    >
        {
        isRegistered ? "Registrado" : "Registrarme"
        }
    </button>
  )
}

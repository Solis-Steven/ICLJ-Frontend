"use client"
import { useState, useEffect } from "react";
import { getActivitie } from "./services/activitie.services";
import { notifyError } from "@/utilities/notifyError";
import UserList from "../addUser/UserList";
import { useRouter } from "next/navigation";
import { AddButton } from "@/components/AddButton";
import { AddActivitieModal } from "../components/AddActivitieModel";
import { deleteActivitie } from "../addUser/components/services/templateuser.services";
import { notifySuccess } from "@/utilities/notifySuccess";
import { useModal } from "@/hooks/useModal";
import { AddUserModal } from "./components/AddUserModal";

const page = ({params}) => {
    const [id, setId] = useState(params.id);
    const [name, setName] = useState("");
    const [assistance, setAssistance] = useState(false);
    const [users, setUsers] = useState([]);
    const [activitie, setActivitie] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const getActivitieEffect = async () => {
            try {
                const data = await getActivitie(id);
                setName(data.name);
                setAssistance(data.assistance);
                setUsers(data.users);
                setActivitie(data);
            } catch (error) {
                console.log({error});
            }
        }
        getActivitieEffect();
    }, [users]);

    const viewModalAdd = () => {
        setIsOpen(true);
    };

    const editElement = () => {
        setShowModal(true);
    };

    const { 
        setDeleteModal
    } = useModal();

    const deleteElement = async () => {
        try {
            const data = await deleteActivitie(id);
            notifySuccess(data.msg);
            router.push("/admin/activities")
        } catch (error) {
            notifyError(error.response.data.msg);
        }
    }
    const handleDeleteModal = () => {
        setDeleteModal(
          "Eliminar Actividad",                                                                                          
          "¿Estás seguro de que quieres eliminar esta actividad?",
          () => deleteElement() 
        );
    };
    return(
        <section className="w-full">
            <div className="flex gap-3 " style={{marginBottom: '20px'}}>
                <button
                    onClick={() => router.push("/admin/activities")}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path str okeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </button>

                <h1 className="font-bold text-2xl">{name}</h1>

                <div className="flex justify-end w-full">
                    <div className="flex items-center space-x-2 mr-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                        <button
                        className="py-2 rounded text-gray-500"
                        onClick={editElement}
                        >
                            Editar
                        </button>
                    </div>
                    <div className="flex items-center space-x-2 mr-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        <button 
                        className="text-gray-500 py-2 rounded"
                        onClick={handleDeleteModal}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
                
                
                <AddActivitieModal
                    activitieId={activitie._id}
                    activitie={activitie}
                    showModal={showModal}
                    closeModal={() => setShowModal(false)}
                />
            </div>
            {
                assistance ?
                (
                    <AddButton
                    addElement={viewModalAdd}
                    name={"Agregar Participante"}
                />
                ):(
                    <></>
                )}
            <AddUserModal
                id_activitie={id}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <UserList
                activitie={activitie}
                users={users}
            />
        </section>
    );
}

export default page;
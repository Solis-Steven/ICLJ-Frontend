import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { notifyError } from "@/utilities/notifyError";
import { notifySuccess } from '@/utilities/notifySuccess';
import { Input } from "@/components/Input";
import { addUserActivitie } from '../services/activitie.services';

export const AddUserModal = ({ isOpen, onClose, id_activitie }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [assisted, setAssisted] = useState(false);
    // const [state, setState] = useState(false);
    
    const handleNameChange = (name) => {
        setName(name);
    };
    const handlePhoneChange = (phone) => {
        setPhone(phone);
    };

    const handleSubmit = async () => {
        if ([name, phone].includes("")) {
            notifyError("Todos los campos son obligatorios");
            return;
        }
        const phoneRegex = /^\d{8}$/;
        if (!phoneRegex.test(phone)) {
            notifyError("El número de teléfono debe tener 8 dígitos");
            return;
        }
        try {
            const data = await addUserActivitie(id_activitie, {
                name: name,
                phone: phone 
            });
            notifySuccess(data.msg)
            onClose();

        } catch (error) {
            notifyError(error.response.data.msg);
        }
    };
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed z-5 inset-0 overflow-y-auto" onClose={onClose}>

                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4   text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-1/3 sm:p-6">
                            <div className="absolute top-0 right-0 mt-4 mr-4">
                                <button type='button' onClick={onClose}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </button>
                            </div>
                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 font-extrabold">
                                Agregar Participante
                            </Dialog.Title>

                            <Input
                                id={name}
                                labelText={"Nombre"}
                                placeholder={"Ingrese el nombre"}
                                type="text"
                                onChange={handleNameChange}
                            />
                            <Input
                                id={phone}
                                labelText={"Telefono"}
                                placeholder={"Ingrese el telefono"}
                                type="text"
                                onChange={handlePhoneChange}
                            />
                          
                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    className="inline-flex justify-center w-full rounded-md border 
                                    border-transparent shadow-sm px-4 py-2 bg-secondary hover:bg-sky-700  
                                    text-base font-medium text-white  focus:outline-none focus:ring-2 
                                    focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                    onClick={handleSubmit}
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}


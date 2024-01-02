import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { notifyError } from "@/utilities/notifyError";
import { Input } from "@/components/Input";
import { getAllMembers } from "../../members/services/member.services";
import { notifySuccess } from "@/utilities/notifySuccess";
import { UpdateConsolidationHouseById } from "../services/consolidationHouses.services";
export const EditModal = ({ isOpen, onClose, consolidationData, dateT, timeT}) => {
    const [name, setName] = useState(consolidationData.name);
    const [leader, setLeader] = useState(consolidationData.leader);
    const [date, setDate] = useState(dateT);
    const [time, setTime] = useState(timeT);
    const [address, setAddress] = useState(consolidationData.address);
    const [members, setMembers] = useState([]);
    
    const handleNameChange = (newName) => {
        setName(newName);
    };
    const handleLeaderChange = (event) => {
        const newLeader = event.target.value;
        setLeader(newLeader);
    };
    const handleDateChange = (newDate) => {
        setDate(newDate);
    };
    const handleTimeChange = (newTime) => {
        setTime(newTime);
    };
    const handleAddressChange = (event) => {
        const newAddress = event.target.value;
        setAddress(newAddress);
    };

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const membersData = await getAllMembers();
                setMembers(membersData);
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };
        fetchMembers();
    }, []);
    const handleSubmit = async () => {
        const combinedString = `${date||dateT}T${time||timeT}:00.000Z`;
        if ([name, leader, combinedString, address].includes("")) {
            notifyError("Todos los campos son obligatorios");

            return;
        }

        try {
            await UpdateConsolidationHouseById(consolidationData._id,{ name, leader, date:combinedString, address });

            // La casa de consolidación se ha creado con éxito
            notifySuccess(`casa de consolidación ${name} editada exitosamente`);
            onClose();

        } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la agregación
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

                    {/* This element is to trick the browser into centering the modal contents. */}
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
                                    {/* Alinear el botón en la esquina superior derecha */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </button>
                            </div>
                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                Editar CDC
                            </Dialog.Title>

                            <Input
                                id={name}
                                labelText={"Nombre"}
                                placeholder={consolidationData.name}
                                type="text"
                                value={consolidationData.name}
                                onChange={handleNameChange}
                            />
                            <label htmlFor="leader" className="uppercase block text-md font-bold text-gray-600">
                                LÍDER
                            </label>
                            <select
                                id="leader"
                                name="leader"
                                value={leader}
                                onChange={handleLeaderChange}
                                className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
                            >
                                {members.map((miembro) => (
                                    <option key={miembro._id} value={miembro._id}>
                                        {miembro.name}
                                    </option>
                                ))}
                            </select>
                            <Input
                                id={date}
                                labelText={"Fecha"}
                                placeholder={date}
                                type="date"
                                value={dateT}	
                                onChange={handleDateChange}
                            />
                            <Input
                                id={time}
                                labelText={"Hora"}
                                placeholder={time}
                                value={timeT}	
                                onChange={handleTimeChange}	
                                type="time"
                               
                            />
                            <label htmlFor="address" className="uppercase block text-md font-bold text-gray-600">
                                DIRECCIÓN
                            </label>
                            <textarea
                                id={address}
                                name="address"
                                placeholder={consolidationData.address}
                                value={address}
                                onChange={handleAddressChange}
                                rows="2"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                          
                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="button"
                                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-secondary hover:bg-teal-300  text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                    onClick={handleSubmit}
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

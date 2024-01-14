"use client"

import { Fragment, useState, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { Input } from "@/components/Input"
import { Address } from "@/components/Address"
import { addSite, editSite, getAllSites } from "../services/site.services"
import React from "react"
import { notifyError } from "@/utilities/notifyError"
import { notifySuccess } from "@/utilities/notifySuccess"

export const AddSiteModal = ({ siteId, showModal, closeModal, site }) => {
    const [formData, setFormData] = useState({
        name: siteId ? site.name : "",
        address: siteId ? site.address : "",
    });

    const handleChange = (field, value) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
    };
    
    const commonInputProps = {
        id: "siteName",
        labelText: "Lugar",
    };

    const handleSubmit = async () => {
        const { name, address } = formData;
        if (name === "" || address === "") {
            notifyError("Todos los campos son obligatorios");
            return;
        }
        try {
            const data = siteId
                ? await editSite(siteId, formData)
                : await addSite(formData);

            notifySuccess(data.msg);
            closeModal();
        } catch (error) {
            console.error("Error:", error);
            notifyError(error.response?.data?.msg || "Error adding/editing site");
        }
    };

    return (
        <Transition.Root show={showModal} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={closeModal}>
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
                        <Dialog.Overlay
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        />
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
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={closeModal}
                                >
                                    <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        {siteId ? "Editar Sede" : "Agregar Sede"}
                                    </Dialog.Title>

                                    <form
                                        className="my-10"
                                    >
                                        <Input
                                            {...commonInputProps}
                                            placeholder="Lugar de la Sede"
                                            value={formData.name}
                                            onChange={(value) => handleChange("name", value)}
                                        />
                                        <Address 
                                            value={formData.address}
                                            handleChange={(value) => handleChange("address", value)}
                                        />
                                    
                                        <input
                                            value={siteId ? "Guardar Cambios" : "Agregar Sede"}
                                            className="text-center bg-secondary hover:bg-sky-700 w-full 
                                            p-3 text-white uppercase font-bold cursor-pointer
                                            transition-colors rounded text-sm"
                                            onClick={handleSubmit}
                                        />
                                    </form>

                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
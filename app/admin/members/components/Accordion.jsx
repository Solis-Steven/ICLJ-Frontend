"use client"

import { Input } from "@/components/Input";
import { useState } from "react";
import { Role } from "./Role";
import { EditButton } from "@/components/EditButton";
import { DeleteButton } from "@/components/DeleteButton";
import { useModal } from "@/hooks/useModal";
import { disableMember } from "../services/member.services";
import { notifySuccess } from "@/utilities/notifySuccess";

export const Accordion = ({ member, setMembers, handleEdit, isActive }) => {
    const [isAccordionOpen, setAccordionOpen] = useState(false);

    const toggleAccordion = () => {
        setAccordionOpen(!isAccordionOpen);
    };

    const {
        setDeleteModal
    } = useModal();

    const handleDeleteModal = () => {
        setDeleteModal(
            "Desactivar Miembro",
            "¿Estás seguro de que quieres desactivar un miembro?",
            () => disableMemberCallback(member._id)
        );
    };

    const disableMemberCallback = async (memberId) => {
        try {
            const data = await disableMember(memberId);
            setMembers((prevMembers) =>
                prevMembers.filter((member) => member._id !== memberId)
            );
            notifySuccess(data.msg)
        } catch (error) {
            console.error("Error deleting member:", error);
        }
    };

    return (
        <div id="accordion-collapse" data-accordion="collapse">
            <h2 id="accordion-collapse-heading-1">
                <button
                    type="button"
                    className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right 
                    text-gray-500 border border-b-1 border-gray-200 gap-3 
                    ${isAccordionOpen ? "bg-gray-200" : ""}`}
                    data-accordion-target="#accordion-collapse-body-1"
                    aria-expanded={isAccordionOpen}
                    aria-controls="accordion-collapse-body-1"
                    onClick={toggleAccordion}
                >
                    <span className="font-bold">{member.name}</span>
                    <svg
                        data-accordion-icon
                        className={`w-3 h-3 shrink-0 ${isAccordionOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                    </svg>
                </button>
            </h2>
            <div
                id="accordion-collapse-body-1"
                className={`p-5 border border-b-1 border-gray-200 grid grid-cols-1 
                lg:grid-cols-2 justify-center ${isAccordionOpen ? "" : "hidden"}`}
                aria-labelledby="accordion-collapse-heading-1"
            >
                <Input
                    id={`phoneNumber-${member.name}`}
                    labelText={"Teléfono"}
                    placeholder={"Número de Teléfono"}
                    disabled={true}
                    value={member.phone}
                    />

                <Input
                    id={`email-${member.name}`}
                    labelText={"Correo Electrónico"}
                    placeholder={"Correo Electrónico"}
                    disabled={true}
                    value={member.email} />

                <Input
                    id={`address-${member.name}`}
                    labelText={"Dirección"}
                    placeholder={"Dirección de residencia"}
                    disabled={true}
                    value={member.address} />

                <Role
                    value={member.role}
                />

                <section className="flex gap-8 items-center flex-col md:flex-row">
                    <EditButton
                        editElement={() => handleEdit(member)} />
                    <DeleteButton
                        name={`${isActive ? "Desactivar" : "Activar"}`}
                        deleteElement={handleDeleteModal}
                    />
                </section>
            </div>
        </div>
    );
};

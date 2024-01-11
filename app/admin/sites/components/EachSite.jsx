"use client"

import { EditButton } from "@/components/EditButton";
import { Input } from "@/components/Input";
import { useState } from "react";
import { addSite, deleteSite, editSite } from "../services/site.services";
import { DeleteButton } from "@/components/DeleteButton";
import { useModal } from "@/hooks/useModal";
import { AddSiteModal } from "./AddSiteModal";
import { notifyError } from "@/utilities/notifyError";
import { notifySuccess } from "@/utilities/notifySuccess";

export const EachSite = ({ site }) => {
    const [showModal, setShowModal] = useState(false);

    const editElement = () => {
        setShowModal(true);
    };
    const deleteElement = async () => {
        try {
            const data = await deleteSite(site._id);
            notifySuccess(data.msg);
        } catch (error) {
            notifyError(error.response.data.msg);
        }
    };
    const { 
        setDeleteModal
    } = useModal();

    const handleDeleteModal = () => {
        setDeleteModal(
          "Eliminar Sede",                                                                                          
          "¿Estás seguro de que quieres eliminar una sede?",
          () => deleteElement() 
        );
    };
    return (
        <div className="flex flex-col md:flex-row gap-3 items-center 
        justify-between border-b-2 pb-3 mb-5">
            <div>
                <h1 className="font-bold text-lg">{site.name}</h1>
                <p>{site.address}</p>
            </div>
            <div className="flex gap-3">
                <EditButton editElement={editElement} />
                <DeleteButton deleteElement={handleDeleteModal} />
                <AddSiteModal
                    site={site}
                    siteId={site._id}
                    showModal={showModal}
                    closeModal={() => setShowModal(false)}
                />
            </div>
        </div>
    );
};


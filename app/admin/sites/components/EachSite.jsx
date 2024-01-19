"use client"

import { EditButton } from "@/components/EditButton";
import { Input } from "@/components/Input";
import { useState } from "react";
import { addSite, deleteSite, editSite, getAllSites } from "../services/site.services";
import { DeleteButton } from "@/components/DeleteButton";
import { useModal } from "@/hooks/useModal";
import { SiteModal } from "./SiteModal";
import { notifyError } from "@/utilities/notifyError";
import { notifySuccess } from "@/utilities/notifySuccess";
import { deleteFile } from "@/config/firebase/config";

export const EachSite = ({ site, setSites ,setOriginSites, handleEdit }) => {
    const [showModal, setShowModal] = useState(false);

    const deleteElement = async () => {
        try {
            const data = await deleteSite(site._id);
            await deleteFile(site.image);
            setSites((prevMembers) =>
                prevMembers.filter((member) => member._id !== site._id)
            );
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
                <EditButton editElement={() => setShowModal(true)} />
                <DeleteButton deleteElement={handleDeleteModal} />
                <SiteModal
                    site={site}
                    siteId={site._id}
                    setSites={setSites}
                    setOriginSites={setOriginSites}
                    showModal={showModal}
                    handleEdit={handleEdit}
                    closeModal={() => {
                        setShowModal(false);
                    }}
                />
            </div>
        </div>
    );
};


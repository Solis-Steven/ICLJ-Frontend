"use client"

import { EditButton } from "@/components/EditButton";
import { Input } from "@/components/Input";
import { useState } from "react";
import { addSite, deleteSite, editSite } from "../services/site.services";
import { DeleteButton } from "@/components/DeleteButton";
import { useModal } from "@/hooks/useModal";
import { AddSiteModal } from "./AddSiteModal";

export const EachSite = ({ site, updateSites }) => {
    const [showModal, setShowModal] = useState(false);

    const editElement = async () => {
        try {
            setShowModal(true);
            updateSites();
        } catch (error) {
            console.error("Error editing site:", error);
        }
    };
    const deleteElement = async () => {
        try {
            await deleteSite(site._id);
            updateSites();
        } catch (error) {
            console.error("Error deleting site:", error);
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
        <section className="shadow-lg p-5">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>{site.name}</h1>
                    <p>{site.address}</p>
                </div>
                <div>
                    <EditButton editElement={editElement} />
                    <DeleteButton deleteElement={handleDeleteModal} />
                    <AddSiteModal
                        siteId={site._id}
                        showModal={showModal}
                        closeModal={() => setShowModal(false)}
                    />
                </div>
            </div>
        </section>
    );
};


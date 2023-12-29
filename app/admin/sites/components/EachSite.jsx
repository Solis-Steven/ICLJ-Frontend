"use client"

import { EditButton } from "@/components/EditButton";
import { Input } from "@/components/Input";
import { useState } from "react";
import { deleteSite, editSite } from "../services/site.services";
import { DeleteButton } from "@/components/DeleteButton";
import { useModal } from "@/hooks/useModal";

export const EachSite = ({ site, updateSites }) => {

    const editElement = async () => {
        try {
            await editSite(site._id, {
                name: "San Gerardo",
                address: "50mts sur del pali"
            });
            updateSites();
        } catch (error) {
            console.error("Error editing site:", error);
        }
    };
    const deleteElement = async ({id}) => {
        try {
            await deleteSite(id);
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
          () => deleteElement(site._id)
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
                </div>
            </div>
        </section>
    );
};


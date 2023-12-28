"use client"

import { EditButton } from "@/components/EditButton";
import { Input } from "@/components/Input";
import { useState } from "react";
import { deleteSite, editSite } from "../services/site.services";
import { DeleteButton } from "@/components/DeleteButton";

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

    const deleteElement = async () => {
        try {
            await deleteSite(site._id);
            updateSites();
        } catch (error) {
            console.error("Error deleting site:", error);
        }
    };
    return (
        <section className="shadow-lg p-5 mt-10">
            <h1>{site.name}</h1>
            <p>{site.address}</p>
            <EditButton
                editElement={editElement}
            />
            <DeleteButton 
                deleteElement={deleteElement}
            />
        </section>
    );
};


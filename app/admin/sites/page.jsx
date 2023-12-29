"use client"

import { addSite, getAllSites } from "../sites/services/site.services.js"
import { useEffect, useState } from "react";
import { EachSite } from "./components/EachSite";
import { AddButton } from "@/components/AddButton";

const page = () => {
    const [sites, setSites] = useState([]);
    useEffect(() => {
        const fetchSites = async () => {
            try {
                const sitesData = await getAllSites();
                setSites(sitesData);
                
            } catch (error) {
                console.error("Error fetching sites:", error);
            }
        };
        fetchSites();
    }, []);

    const updateSites = async () => {
        try {
            const updatedSites = await getAllSites();
            setSites(updatedSites);
        } catch (error) {
            console.error("Error updating sites:", error);
        }
    };

    const addElement = async () => {
        try {
            await addSite({
                name: "San Jose",
                address: "50mts sur de la iglesia"
            });
            updateSites();
        } catch (error) {
            console.error("Error adding site:", error);
        }
    };

    return(
        <section className="w-full">
            <h1 className="font-bold text-2xl">Sedes</h1>  
            <AddButton
                addElement={addElement}
                name={"Agregar Sede"}
            />    
            <section className="shadow-lg p-5 mt-10">
                {sites.map(site => (
                    <EachSite
                        key={site._id}
                        site={site}
                        updateSites={updateSites}
                        />
                ))}
            </section>  
        </section>
    );
}

export default page;
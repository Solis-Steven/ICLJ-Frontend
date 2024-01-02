"use client"

import { addSite, getAllSites } from "../sites/services/site.services.js"
import { useEffect, useState } from "react";
import { EachSite } from "./components/EachSite";
import { AddButton } from "@/components/AddButton";
import { AddSiteModal } from "./components/AddSiteModal.jsx";

const page = () => {
    const [sites, setSites] = useState([]);
    const [showModal, setShowModal] = useState(false);

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
    }, [sites]);

    const addElement = () => {
        setShowModal(true);
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
                    />
                    
                ))}
            </section>  
            <AddSiteModal 
                showModal={showModal}
                closeModal={() => setShowModal(false)}
            />
        </section>
    );
}

export default page;
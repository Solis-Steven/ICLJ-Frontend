"use client"

import { getAllSites } from "../sites/services/site.services"
import { useEffect, useState } from "react";
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
    
    return(
        <section className="w-full">
            <h1 className="font-bold text-2xl">Sedes</h1>      

            <section className="shadow-lg p-5 mt-10">
                {sites.map(site => (
                    <li key={site.name}>
                        <strong>Nombre:</strong> {site.name}, <strong>Dirección:</strong> {site.address}
                    </li>
                ))}
            </section>  
        </section>
    );
}

export default page;
"use client"

import { addSite, getAllSites } from "../sites/services/site.services.js"
import { useEffect, useState } from "react";
import { EachSite } from "./components/EachSite";
import { AddButton } from "@/components/AddButton";
import { SiteModal } from "./components/SiteModal.jsx";
import { Search } from "@/components/Search.jsx";

const page = () => {
    const [sites, setSites] = useState([]);
    const [originSites, setOriginSites] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const getSites = async () => {
            try {
                const data = await getAllSites({ page });
                setSites((prevSites) => [...prevSites, ...data]);
                setOriginSites((prevSites) => [...prevSites, ...data]);
                setIsLoading(false);
            } catch (error) {
                console.error("Error getting sites:", error);
            }
        };
        getSites();
    }, [page]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            setPage((prevPage) => prevPage + 1);
        }
    };
    
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleSearch = (searchValue) => {
        if (searchValue === "") {
            setSites(originSites);
        } else {
            const filteredSites = originSites.filter((site) =>
                site.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setSites(filteredSites);
        }
    };

    return(
        <section className="w-full">
            <h1 className="font-bold text-2xl">Sedes</h1> 

            <section className="flex flex-col sm:flex-row gap-3 items-center mt-5">
                <AddButton
                    addElement={() => setShowModal(true)}
                    name={"Agregar Sede"}
                /> 

                <Search
                    placeholder="Buscar Sede"
                    onChange={handleSearch}
                />
            </section>

            <div className="shadow-lg p-5 mt-10">
            {
                    isLoading && (
                        <div className="flex justify-center">
                            <div
                                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status"
                            >
                                <span
                                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                >
                                    Loading...
                                </span>
                            </div>
                        </div>
                    )
                }

                {
                    sites?.length
                        ? (

                            sites?.map((site => (
                                <EachSite
                                    key={site._id}
                                    site={site}
                                    setSites={setSites} 
                                    setOriginSites={setOriginSites}
                                    page={page}
                                />
                            )))
                        )
                        : !isLoading && (
                            <p className="text-center">A&uacute;n no hay sedes agregados</p>
                        )
                }
            </div>  
            <SiteModal 
                showModal={showModal}
                setSites={setSites} 
                setOriginSites={setOriginSites}
                page={page}
                closeModal={() => {
                    setShowModal(false);
                }}
            />
        </section>
    );
}

export default page;
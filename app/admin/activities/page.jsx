"use client"
import { getAllActivities } from "./services/activities.services.js";
import { useEffect, useState } from "react";
import { AddButton } from "@/components/AddButton";
import { EachActivitie } from "./components/EachActivitie.jsx";
import { AddActivitieModal } from "./components/AddActivitieModel.jsx";
import { useModal } from "@/hooks/useModal";
import { Search } from "@/components/Search.jsx";

const page = () => {
    const [activities, setActivities] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const activitiesData = await getAllActivities();
                setActivities(activitiesData);
                setIsLoading(false);
                
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        };
        fetchActivities();
    }, [activities]);

    const addElement = () => {
        setShowModal(true);
    };

    return(
        <section className="w-full">
            <h1 className="font-bold text-2xl">Actividades</h1>
              
            <div className="flex">
                <div className="mr-4">
                    <AddButton name={"Crear Actividad"} addElement={addElement} />
                </div>
                <div>
                    <Search
                    placeholder="Buscar Actividad"
                    // onChange={handleSearch}
                    />
                </div>
            </div>

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
                    activities?.length
                        ? (

                            activities?.map((activitie => (
                                <EachActivitie
                                    key={activitie._id}
                                    activitie={activitie}
                                />
                            )))
                        )
                        : !isLoading && (
                            <p className="text-center">A&uacute;n no hay actividades agregadas</p>
                        )
                }
            </div> 

            <AddActivitieModal
                    showModal={showModal}
                    closeModal={() => setShowModal(false)}
                />     
        </section>
    );
}

export default page;
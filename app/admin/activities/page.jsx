"use client"
import { getAllActivities } from "./services/activities.services.js";
import { useEffect, useState } from "react";
import { AddButton } from "@/components/AddButton";
import { EachActivitie } from "./components/EachActivitie.jsx";
import { AddActivitieModal } from "./components/AddActivitieModel.jsx";
import { useModal } from "@/hooks/useModal";

const page = () => {
    const [activities, setActivities] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const activitiesData = await getAllActivities();
                setActivities(activitiesData);
                
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
            <h1 style={{marginBottom: '20px'}} className="font-bold text-2xl">Actividades</h1>  
            <AddButton
                name={"Crear Actividad"}
                addElement={addElement}
            />
            <AddActivitieModal
                showModal={showModal}
                closeModal={() => setShowModal(false)}
            />    
            <section className="shadow-lg p-5 mt-10">
                {
                    activities.length
                    ? (
                        activities.map(activitie => (
                            <EachActivitie
                                key={activitie._id}
                                activitie={activitie}
                            />
                            
                        ))
                    ):(
                        <p className="text-center">A&uacute;n no hay actividades agregadas</p> 
                    )
                }
            </section>  
        </section>
    );
}

export default page;
"use client"
import { getAllActivities } from "./services/activities.services.js";
import { useEffect, useState } from "react";
import { AddButton } from "@/components/AddButton";
import { EachActivitie } from "./components/EachActivitie.jsx";

const page = () => {
    const [activities, setActivities] = useState([]);

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
    }, []);

    const updateActivities = async () => {
        try {
            const updatedActivities = await getAllActivities();
            setActivities(updatedActivities);
        } catch (error) {
            console.error("Error updating activities:", error);
        }
    };
    return(
        <section className="w-full">
            <h1 className="font-bold text-2xl">Actividades</h1>  
            <AddButton
                name={"Agregar Actividad"}
            />    
            <section className="shadow-lg p-5 mt-10">
                {activities.map(activitie => (
                    <EachActivitie
                        key={activitie._id}
                        activitie={activitie}
                        updateActivities={updateActivities}
                    />
                    
                ))}
            </section>  
        </section>
    );
}

export default page;
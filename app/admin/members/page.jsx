"use client"

import { useEffect, useState } from "react";
import { Accordion } from "./components/Accordion";
import { getAllMembers } from "./services/member.services";
import { AddButton } from "@/components/AddButton";
import { AddMemberModal } from "./components/AddMemberModal";

const page = () => {
    const [members, setMembers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const membersData = await getAllMembers();
                setMembers(membersData);
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };

        fetchMembers();
    }, []);
    
    return(
        <section className="w-full">
            <h1 className="font-bold text-2xl mb-5">Miembros</h1>   
            <AddButton 
                name="Agregar Miembro"
                addElement={() => setShowModal(true)}    
            />   

            <section className="shadow-lg p-5 mt-5">
                {
                    members?.map(member => (
                        <Accordion 
                            key={member._id}
                            member={member}
                            setMembers={setMembers}
                        />
                    ))
                }
            </section>  

            <AddMemberModal 
                showModal={showModal}
                closeModal={() => setShowModal(false)}
            />
        </section>
    );
}

export default page;
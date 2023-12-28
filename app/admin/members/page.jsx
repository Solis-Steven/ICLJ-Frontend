"use client"

import { useEffect, useState } from "react";
import { Accordion } from "./components/Accordion";
import { getAllMembers } from "./services/member.services";

const page = () => {
    const [members, setMembers] = useState([]);

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
            <h1 className="font-bold text-2xl">Miembros</h1>      

            <section className="shadow-lg p-5 mt-10">
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
        </section>
    );
}

export default page;
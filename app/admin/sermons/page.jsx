"use client"

import { AddButton } from "@/components/AddButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllSermons } from "./services/sermons.services";
import { SermonPreview } from "./components/SermonPreview";

const page = () => {
    const [sermons, setSermons] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const getSermons = async () => {
            try {
                const data = await getAllSermons();
                setSermons(data);
            } catch (error) {
                console.log(error)
            }
        }
        getSermons();
    }, []);

    return (
        <section className="w-full">
            <h1 className="font-bold text-2xl mb-5">Sermones</h1>

            <AddButton
                name="Agregar Sermón"
                addElement={() => router.push("/admin/sermons/addSermon")}
            />

            <section className="shadow-lg p-5 mt-5">
                {
                    sermons?.length 
                    ? (

                        sermons?.map((sermon => (
                            <SermonPreview 
                                key={sermon._id}
                                sermon={sermon}
                                setSermons={setSermons}
                            />
                        )))
                    )
                    : (
                        <p className="text-center">A&uacute;n no hay sermones agregados</p>
                    )
                }
            </section>
        </section>
    );
}

export default page;
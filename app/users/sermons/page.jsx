"use client"

import { useEffect, useState } from "react";
import { SermonPreview } from "./components/SermonPreview";
import { useRouter } from "next/navigation";
import { getAllSermons } from "@/app/admin/sermons/services/sermons.services";

const Sermons = () => {
    const [sermons, setSermons] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSermons = async () => {
            try {
                const data = await getAllSermons({ page });

                if (data) {
                    setSermons((prevMembers) => [...prevMembers, ...data]);
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        fetchSermons();
    }, []);

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

    return (
        <section className="flex flex-col items-center">
            <h1 className="mt-7 text-2xl text-tertiary font-bold">
                Encuentra a Dios por medio de la lectura
            </h1>

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

            <section className="flex flex-col">
                {
                    sermons?.length
                        ? (

                            sermons?.map((sermon => (
                                <SermonPreview
                                    key={sermon._id}
                                    sermon={sermon}
                                />
                            )))
                        )
                        : !isLoading && (
                            <p className="text-center">A&uacute;n no hay sermones agregados</p>
                        )
                }
            </section>
        </section>
    );
}

export default Sermons;

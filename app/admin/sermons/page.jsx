"use client"

import { AddButton } from "@/components/AddButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllSermons } from "./services/sermons.services";
import { SermonPreview } from "./components/SermonPreview";
import { Search } from "@/components/Search";

const Page = () => {
    const [originalSermons, setOriginalSermons] = useState([]);
    const [sermons, setSermons] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const getSermons = async () => {
        try {
            const data = await getAllSermons({ page });
            setOriginalSermons((prevMembers) => [...prevMembers, ...data]);
            setSermons((prevMembers) => [...prevMembers, ...data]);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSermons();
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

        if(searchValue === "") {
            setSermons(originalSermons);
            return;
        }

        const filteredSermons = originalSermons.filter(sermon =>
            sermon.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        setSermons(filteredSermons);
    };

    return (
        <section className="w-full">
            <h1 className="font-bold text-2xl mb-5">Sermones</h1>

            <section className="flex flex-col sm:flex-row gap-3 items-center">

                <AddButton
                    name="Agregar Sermón"
                    addElement={() => router.push("/admin/sermons/addSermon")}
                />

                <Search 
                    placeholder="Buscar Sermón"
                    onChange={handleSearch}
                />
            </section>

            <section className="shadow-lg p-5 mt-5">
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
                        : !isLoading && (
                            <p className="text-center">A&uacute;n no hay sermones agregados</p>
                        )
                }
            </section>
        </section>
    );
}

export default Page;
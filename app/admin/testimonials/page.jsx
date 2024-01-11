"use client"

import { AddButton } from "@/components/AddButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TestimonialPreview } from "./components/TestimonialPreview";
import { getAllTestimonials } from "./services/testimonials.services";
import { Search } from "@/components/Search";

const page = () => {
    const [originalTestimonials, setOriginalTestimonials] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getTestimonials = async () => {
            try {
                const data = await getAllTestimonials({ page });
                setOriginalTestimonials((prevMembers) => [...prevMembers, ...data]);
                setTestimonials((prevMembers) => [...prevMembers, ...data]);
                setIsLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        getTestimonials();
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
            setTestimonials(originalTestimonials);
            return;
        }

        const filteredTestimonials = originalTestimonials.filter(testimonial =>
            testimonial.personName.toLowerCase().includes(searchValue.toLowerCase())
        );
        setTestimonials(filteredTestimonials);
    };

    return (
        <section className="w-full">
            <h1 className="font-bold text-2xl mb-5">Testimonios</h1>

            <section className="flex flex-col sm:flex-row gap-3 items-center">
                <AddButton
                    name="Agregar Testimonio"
                    addElement={() => router.push("/admin/testimonials/addTestimonial")}
                />

                <Search 
                    placeholder="Buscar Testimonio"
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
                    testimonials.length
                        ? (

                            testimonials.map((testimonial => (
                                <TestimonialPreview
                                    key={testimonial._id}
                                    testimonial={testimonial}
                                    setTestimonials={setTestimonials}
                                />
                            )))
                        )
                        : !isLoading && (
                            <p className="text-center">A&uacute;n no hay testimonios agregados</p>
                        )
                }
            </section>
        </section>
    );
}

export default page;
"use client"

import { getAllTestimonials } from "@/app/admin/testimonials/services/testimonials.services";
import { useEffect, useState } from "react";
import { TestimonialForm } from "./components/TestimonialForm";
import { OutlineCard } from "./components/OutlineCard";
import { SolidCard } from "./components/SolidCard";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const data = await getAllTestimonials({ page });

                if (data) {
                    setTestimonials((prevTestimonials) => [...prevTestimonials, ...data]);
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error)
            }
        }

        fetchTestimonials();
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

    const renderTestimonialCards = () => {
        const testimonialCount = testimonials.length;

        const isOddCount = testimonialCount % 2 !== 0;

        const cardCount = testimonialCount;

        return Array.from({ length: cardCount / 2 + (isOddCount ? 1 : 0) }, (_, index) => {
            const startIndex = index * 2;

            return (
                <div key={startIndex} className="flex gap-8">
                    <OutlineCard testimonial={testimonials[startIndex]} />
                    {testimonials[startIndex + 1] && <SolidCard testimonial={testimonials[startIndex + 1]} />}
                </div>
            );
        });
    };


    return (
        <>
            <section>
                <img
                    src="/bg.jpg"
                    alt="Imagen de fondo"
                    className="top-0 left-0 w-full h-96 object-cover relative"
                />

                <div className="z-10 absolute top-40 left-10 ">
                    <p className="text-white text-lg">Casa de Luz Jireh</p>
                    <h1 className="text-white text-4xl font-bold">
                        Testimonios <br /> Sobrenaturales
                    </h1>
                </div>
            </section>

            <section className="flex flex-col">
                <h2 className="mt-7 text-2xl text-tertiary font-bold text-center">
                    Lo que las personas reciben aqu&iacute;
                </h2>

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

                <article className="flex flex-col gap-8 my-10 lg:mx-40 2xl:mx-80">
                    {
                        testimonials.length
                            ? (
                                renderTestimonialCards()
                            )
                            : !isLoading && (
                                <p>A&uacute;n no hay testimonios</p>
                            )
                    }
                </article>

                <article className="p-14 bg-tertiary flex flex-col lg:flex-row justify-center items-center">
                    <div className="flex flex-col lg:flex-row gap-8 justify-center items-center w-3/4">
                        <div className="">
                            <p className="text-white">Iglesia Casa de Luz Jireh</p>
                            <h2 className="text-2xl text-white font-bold">
                                Comparte tu testimonio con toda la comunidad
                            </h2>
                            <p className="text-white text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur accusamus quo non temporibus, quas veritatis aperiam obcaecati, quam a veniam impedit quis sint doloremque reprehenderit ad nostrum deleniti amet in.</p>
                        </div>

                        <TestimonialForm />
                    </div>
                </article>

            </section>
        </>
    );
}

export default Testimonials;
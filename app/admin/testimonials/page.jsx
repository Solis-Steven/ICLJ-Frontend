"use client"

import { AddButton } from "@/components/AddButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TestimonialPreview } from "./components/TestimonialPreview";
import { getAllTestimonials } from "./services/testimonials.services";

const page = () => {
    const [testimonials, setTestimonials] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const getTestimonials = async () => {
            try {
                const data = await getAllTestimonials();
                setTestimonials(data);
            } catch (error) {
                console.log(error)
            }
        }
        getTestimonials();
    }, []);

    return (
        <section className="w-full">
            <h1 className="font-bold text-2xl mb-5">Testimonios</h1>

            <AddButton
                name="Agregar Testimonio"
                addElement={() => router.push("/admin/testimonials/addTestimonial")}
            />

            <section className="shadow-lg p-5 mt-5">
                {
                    testimonials?.length 
                    ? (

                        testimonials?.map((testimonial => (
                            <TestimonialPreview 
                                key={testimonial._id}
                                testimonial={testimonial}
                                setTestimonials={setTestimonials}
                            />
                        )))
                    )
                    : (
                        <p className="text-center">A&uacute;n no hay testimonios agregados</p>
                    )
                }
            </section>
        </section>
    );
}

export default page;
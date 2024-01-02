"use client"

import { Input } from "@/components/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import toolbar from "@/config/toolbar";
import { AddButton } from "@/components/AddButton";
import { addTestimonial } from "./services/addTestimonial.services";
import { Select } from "./components/Select";
import { notifySuccess } from "@/utilities/notifySuccess";

const AddTestimonial = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const { quill, quillRef } = useQuill({
        modules: {
            toolbar
        }
    });

    const router = useRouter();

    const handleNameChange = (name) => {
        setName(name);
    };
    
    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const testimonialData = {
            personName: name,
            type,
            testimonial: JSON.stringify(quill.getContents())
        }

        try {
            const data = await addTestimonial(testimonialData)

            notifySuccess(data.msg);

            setName("");
            setType("");
            quill.setText("");
        } catch (error) {
            
        }
    }

    return (
        <section className="w-full">
            <div className="flex gap-3 ">
                <button
                    onClick={() => router.push("/admin/testimonials")}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </button>

                <h1 className="font-bold text-2xl">Nuevo Testimonio</h1>
            </div>

            <section className="shadow-lg p-5 mt-5">
                <form>

                    <Input
                        id="testimonialName"
                        labelText="Nombre"
                        placeholder="Nombre de la persona"
                        value={name}
                        onChange={handleNameChange}
                    />

                    <Select 
                        value={type}
                        onChange={handleTypeChange}
                    />

                    <div className="my-5">
                        <div ref={quillRef}></div>
                    </div>

                    <AddButton 
                        name="Agregar Testimonio"
                        addElement={handleSubmit}
                    />
                </form>
            </section>
        </section>
    );
}

export default AddTestimonial;
"use client"

import { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import toolbar from "@/config/toolbar";
import { useRouter } from "next/navigation";
import { Select } from "../addTestimonial/components/Select";
import { AddButton } from "@/components/AddButton";
import { Input } from "@/components/Input";
import { notifyError } from "@/utilities/notifyError";
import { getTestimonial, updateTestimonial } from "./services/testimonial.services";
import { notifySuccess } from "@/utilities/notifySuccess";

const Testimonial = ({params}) => {
    const [id, setId] = useState(params.id);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [testimonial, setTestimonial] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const {quill, quillRef} = useQuill({
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

    useEffect(() => {
        const getTestimonialEffect = async () => {
            try {
                const data = await getTestimonial(id);
                setName(data.personName);
                setType(data.type);
                quill.setContents(JSON.parse(data.testimonial));
                setTestimonial(data);
                setIsLoading(false);
            } catch (error) {
                console.log({error});
                notifyError(error.response?.data.msg);
            }
        }

        if(quill) {
            getTestimonialEffect();
        }
    }, [quill]);

    const handleEdit = async () => {
        try {
            const testimonialString = JSON.stringify(quill.getContents());
            const data = await updateTestimonial(id, 
                {
                    personName: name, 
                    type, 
                    testimonial: testimonialString
                });
            notifySuccess(data.msg);
            router.push("/admin/testimonials");
        } catch (error) {
            notifyError(error.response.data.msg);
        }
    }

    return(
        <section className="w-full">
            <div className="flex gap-3 ">
                <button
                    onClick={() => router.push("/admin/testimonials")}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </button>

                <h1 className="font-bold text-2xl">Editar Testimonio</h1>
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
                        name="Guardar Cambios"
                        addElement={handleEdit}
                    />
                </form>
            </section>
        </section>
    );
}

export default Testimonial;
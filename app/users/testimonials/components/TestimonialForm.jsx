"use client"

import { useState } from "react";
import { Input } from "./Input";
import { notifyError } from "@/utilities/notifyError";
import { compileTestimonialTemplate, sendMail } from "@/lib/mail";
import { notifySuccess } from "@/utilities/notifySuccess";

export const TestimonialForm = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        testimonial: ""
    });
    const [error, setError] = useState(false);

    const handleInputChange = (id, value) => {
        setData({
            ...data,
            [id]: value,
        });

        if (id === "testimonial" && value.trim() === "") setError(true);
        if (id === "testimonial" && value.trim() !== "") setError(false);
    };

    const send = async () => {
        const emailData = {
            to: data.email,
            name: data.name,
            subject: "Testimonio Compartido",
            body: await compileTestimonialTemplate(data.name, data.phoneNumber, data.email, data.testimonial)
        }

        await sendMail(emailData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([data.name, data.email, data.phoneNumber, data.testimonial]
            .includes("")) {
            notifyError("Todos los campos son obligatorios");
            return;
        }

        try {
            send();
            notifySuccess("Testimonio enviado correctamente");
            setData({
                name: "",
                email: "",
                phoneNumber: "",
                testimonial: ""
            });
        } catch (error) {
            notifyError("Error al enviar testimonio");
        }

        console.log("data", data)
    }

    return (
        <section className="border p-2 sm:p-10 rounded-lg w-full">
            <h2 className="text-2xl text-white font-bold mb-8">
                Enviar Testimonio
            </h2>

            <form onSubmit={e => handleSubmit(e)} className="flex flex-col gap-4">
                <Input
                    id="name"
                    formValue={data["name"]}
                    onChange={(value) => handleInputChange("name", value)}
                >
                    Nombre Completo
                </Input>

                <Input
                    id="email"
                    formValue={data["email"]}
                    onChange={(value) => handleInputChange("email", value)}
                    type="email"
                >
                    Correo electrónico
                </Input>

                <Input
                    id="phone"
                    formValue={data["phoneNumber"]}
                    onChange={(value) => handleInputChange("phoneNumber", value)}
                >
                    Número de teléfono
                </Input>

                <div className="">

                    <div className="relative">
                        <textarea
                            id="testimonial"
                            value={data["testimonial"]}
                            onChange={e => handleInputChange("testimonial", e.target.value)}
                            className={`block px-2.5 py-1 w-full text-sm bg-transparent 
                        rounded-lg appearance-none focus:outline-none focus:ring-0 peer
                        border resize-none
                        ${error ? "border-red-500 text-red-500 focus:border-red-500"
                                    : "border-gray-300 text-white focus:border-secondary"}`}
                            placeholder=" "
                        ></textarea>
                        <label
                            htmlFor="testimonial"
                            className={`absolute text-sm duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] 
                        bg-tertiary px-2 peer-focus:px-2 
                        peer-placeholder-shown:scale-100 
                        peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                        peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1
                        ${error ? "text-red-500 peer-focus:text-red-500" : "text-white peer-focus:text-secondary"}`}>
                            Testimonio
                        </label>
                    </div>
                    {
                        error &&
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500 mt-2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>

                            <p
                                id="filled_success_help"
                                className="mt-2 text-xs text-red-500 text-center">
                                Este campo es obligatorio
                            </p>
                        </div>
                    }
                </div>


                <button
                    type="submit"
                    className="bg-primary p-2 text-lg text-white self-start
                    rounded-md hover:bg-darkPrimary"
                >
                    Enviar
                </button>
            </form>
        </section>
    );
}

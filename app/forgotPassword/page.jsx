"use client"

import { Input } from "@/components/Input";
import { notifyError } from "@/utilities/notifyError";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { forgotPassword } from "./services/forgotPassword.services";
import { notifySuccess } from "@/utilities/notifySuccess";
import { compileForgotPasswordTemplate, sendMail } from "@/lib/mail";

const ForgotPassword = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");

    const handleEmailChange = (newEmail) => {
        setEmail(newEmail);
    };

    const send = async (token) => {
        const emailData = {
            to: email,
            name: "",
            subject: "Recuperación de contraseña",
            body: await compileForgotPasswordTemplate(token)
        }

        await sendMail(emailData);
    }
    
    const handleSubmit = async e => {
        e.preventDefault();

        if([email].includes("")) {
            notifyError("Introduce tu correo")

            return;
        }

        try {
            const data = await forgotPassword({email})

            notifySuccess(data.msg)
            setEmail("")
            send(data.token)
        } catch (error) {
            notifyError(error.response.data.msg);
        }
    }

    return(
        <section className="w-full h-full flex items-center justify-center px-10 sm:px-20">
            <div className="w-full md:w-1/2">
                <h1 className="text-primary font-black text-6xl capitalize">
                    Recupera Tu Contrase&ntilde;a E Inicia Sesi&oacute;n
                </h1>
        
                <form
                    onSubmit={handleSubmit}
                    className="my-10 bg-white shadow rounded-lg p-10"
                >
                    <Input
                        id={"email"}
                        labelText={"Correo Electrónico"}
                        placeholder={"Correo electrónico de registro"}
                        value={email}
                        onChange={handleEmailChange}
                    />

                    <input
                        type="submit"
                        value="Enviar Email"
                        className="bg-primary mb-5 w-full py-3 text-white uppercase
                        font-bold rounded hover:cursor-pointer hover:bg-darkPrimary
                        transition-colors"
                    />

                </form>

                <nav className="lg:flex lg:justify-end">
                    <Link
                        href="/login"
                        className="block text-center my-5 text-slate-500 uppercase
                        text-sm"
                    >
                        ¿Ya tienes una cuenta?{" "}
                        <span className="text-primary">Inicia Sesión</span>
                    </Link>
                </nav>
            </div>
        </section>
    );
}

export default ForgotPassword;
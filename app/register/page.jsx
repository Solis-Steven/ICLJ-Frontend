"use client"

import { Input } from "@/components/Input";
import Link from "next/link";
import { useState } from "react";
import { Address } from "../../components/Address";
import { register } from "./services/register.services";
import { compileRegisterTemplate, sendMail } from "@/lib/mail";
import { notifyError } from "@/utilities/notifyError";
import { notify } from "@/utilities/notify";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        password: "",
    });

    const handleInputChange = (id, value) => {
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const send = async (user) => {
        const emailData = {
            to: user.email,
            name: user.name,
            subject: "Confirmación de tu cuenta",
            body: await compileRegisterTemplate(user.name, user.token)
        }

        await sendMail(emailData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([formData.email, formData.password,
        formData.name, formData.address, formData.phone].includes("")) {
            notifyError("Todos los campos son obligatorios");

            return;
        }

        try {
            const data = await register(formData);

            send(data.user)
            notify("Revisa tu correo para confirmar tu cuenta");
            setFormData({
                name: "",
                phone: "",
                email: "",
                address: "",
                password: "",
            });

        } catch (error) {
            notifyError(error.response.data.msg);
        }
    };


    return (
        <section className="w-full h-full flex items-center justify-center px-10 sm:px-20">
            <div className="w-full md:w-1/2">
                <h1 className="text-primary font-black text-6xl capitalize">
                    Crea Tu Cuenta Y Regístrate A Eventos
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="my-10 bg-white shadow rounded-lg p-10"
                >
                    <Input
                        id={"name"}
                        labelText={"Nombre"}
                        placeholder={"Tu nombre"}
                        value={formData["name"]}
                        onChange={(value) => handleInputChange("name", value)}
                    />

                    <Input
                        id={"phone"}
                        labelText={"Número de teléfono"}
                        placeholder={"Tu número de teléfono"}
                        value={formData["phone"]}
                        onChange={(value) => handleInputChange("phone", value)}
                    />

                    <Input
                        id={"email"}
                        labelText={"Correo Electrónico"}
                        placeholder={"Correo electrónico de registro"}
                        value={formData["email"]}
                        onChange={(value) => handleInputChange("email", value)}
                    />

                    <Address
                        value={formData["address"]}
                        handleChange={(value) => handleInputChange("address", value)}
                    />

                    <Input
                        id={"password"}
                        labelText={"Contraseña"}
                        placeholder={"Contraseña de registro"}
                        type="password"
                        value={formData["password"]}
                        onChange={(value) => handleInputChange("password", value)}
                    />

                    <input
                        type="submit"
                        value="Crear Cuenta"
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
};

export default Register;

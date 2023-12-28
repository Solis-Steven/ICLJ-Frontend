"use client"

import { Input } from "@/components/Input";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ForgotPassword = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [alert, setAlert] = useState({});

    const { setAuth } = useAuth();

    const handleEmailChange = (newEmail) => {
        setEmail(newEmail);
    };
    
    const handleSubmit = async e => {
        e.preventDefault();

        if([email].includes("")) {
            setAlert({
                msg: "Todos los campos son obligatorios",
                error: true
            });

            return;
        }

        // try {
        //     const data = await login({email, password})
        //     console.log("data", data)

        //     setAlert({});
        //     localStorage.setItem("token", data.token);
        //     setAuth(data);
        //     router.push("/admin/members")
        // } catch (error) {
        //     setAlert({
        //         msg: error.response.data.msg,
        //         error: true
        //     });
        // }
    }

    const { msg } = alert;

    return(
        <section className="w-full h-screen flex items-center justify-center px-10 sm:px-20">
            <div className="w-full md:w-1/2 lg:w-1/3">
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
                        onChange={handleEmailChange}
                    />

                    <input
                        type="submit"
                        value="Enviar Email"
                        className="bg-primary mb-5 w-full py-3 text-white uppercase
                        font-bold rounded hover:cursor-pointer hover:bg-darkPrimary
                        transition-colors"
                    />

                    {msg && <Alert alert={alert} />}
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
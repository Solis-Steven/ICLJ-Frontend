"use client"

import { Input } from "@/components/Input";
import Link from "next/link";
import { useState } from "react";
import { login } from "./services/login.services";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { notifyError } from "@/utilities/notifyError";

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setAuth } = useAuth();

    const handleEmailChange = (newEmail) => {
        setEmail(newEmail);
    };

    const handlePasswordChange = (newPassword) => {
        setPassword(newPassword);
    };
    
    const handleSubmit = async e => {
        e.preventDefault();

        if([email, password].includes("")) {
            notifyError("Todos los campos son obligatorios")

            return;
        }

        try {
            // const { data } = await clienteAxios.post("/usuarios/login", {
            //     email, 
            //     password
            // });
            const data = await login({email, password})

            localStorage.setItem("token", data.token);
            setAuth(data);
            router.push("/admin/members")
        } catch (error) {
            notifyError(error.response.data.msg);
        }
    }

    return(
        <section className="w-full h-full flex items-center justify-center px-10 sm:px-20">
            <div className="w-full md:w-1/2">
                <h1 className="text-primary font-black text-6xl capitalize">
                    Inicia Sesión Y Regístrate A Eventos
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

                    <Input
                        id={"password"}
                        labelText={"Contraseña"}
                        placeholder={"Contraseña de registro"}
                        type="password"
                        onChange={handlePasswordChange}
                    />

                    <input
                        type="submit"
                        value="Iniciar Sesión"
                        className="bg-primary mb-5 w-full py-3 text-white uppercase
                        font-bold rounded hover:cursor-pointer hover:bg-darkPrimary
                        transition-colors"
                    />

                </form>

                <nav className="lg:flex lg:justify-between">
                    <Link
                        href="/register"
                        className="block text-center my-5 text-slate-500 uppercase
                        text-sm"
                    >
                        ¿No tienes una cuenta?{" "}
                        <span className="text-primary">Regístrate</span>
                    </Link>

                    <Link
                        href="/forgotPassword"
                        className="block text-center my-5 text-slate-500 uppercase
                        text-sm"
                    >
                        Olvidé Mi Contrase&ntilde;a
                    </Link>
                </nav>
            </div>
        </section>
    );
}

export default Login;
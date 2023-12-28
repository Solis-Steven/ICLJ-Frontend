"use client"

import { Input } from "@/components/Input";
import Link from "next/link";
import { useState } from "react";
import { Alert } from "@/components/Alert";
import { login } from "./services/login.services";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
// import { useAuth } from "../hooks/useAuth";

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState({});

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
            setAlert({
                msg: "Todos los campos son obligatorios",
                error: true
            });

            return;
        }

        try {
            // const { data } = await clienteAxios.post("/usuarios/login", {
            //     email, 
            //     password
            // });
            const data = await login({email, password})
            console.log("data", data)

            setAlert({});
            localStorage.setItem("token", data.token);
            setAuth(data);
            router.push("/admin/members")
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const { msg } = alert;

    return(
        <section className="w-1/3">
            <h1 className="text-primary font-black text-6xl capitalize">
                Inicia Sesión Y Registrate A Eventos
            </h1>
        
            <form 
                onSubmit={handleSubmit}
                className="my-10 bg-white shadow rounded-lg p-10">
                <Input 
                    id={email}
                    labelText={"Correo Electrónico"}
                    placeholder={"Correo electrónico de registro"}
                    onChange={handleEmailChange}/>

                <Input 
                    id={password}
                    labelText={"Contraseña"}
                    placeholder={"Contraseña de registro"}
                    onChange={handlePasswordChange}/>

                <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="bg-primary mb-5 w-full py-3 text-white uppercase
                    font-bold rounded hover:cursor-pointer hover:bg-sky-800
                    transition-colors"
                />

                {
                    msg && <Alert alert={alert}/>
                }
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    href="/register"
                    className="block text-center my-5 text-slate-500 uppercase
                    text-sm">
                    ¿No tienes una cuenta? <span className="text-primary">Reg&iacute;strate</span>
                </Link>

                <Link 
                    href=""
                    className="block text-center my-5 text-slate-500 uppercase
                    text-sm">
                    Olvidé Mi Password
                </Link>
            </nav>
        </section>
    );
}

export default Login;
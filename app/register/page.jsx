"use client"

import { Input } from "@/components/Input";
import Link from "next/link";
import { useState } from "react";
// import { Alerta } from "../components/Alerta";
// import { clienteAxios } from "../config/clienteAxios";
// import { useAuth } from "../hooks/useAuth";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState({});

    // const { setAuth } = useAuth();
    // const navigate = useNavigate();
    
    const handleSubmit = async e => {
        e.preventDefault();

        if([email, password].includes("")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            });


            return;
        }

        try {
            const { data } = await clienteAxios.post("/usuarios/login", {
                email, 
                password
            });

            setAlerta({});
            localStorage.setItem("token", data.token);
            setAuth(data);
            navigate("/proyectos");
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const { msg } = alerta;

    return(
        <section className="w-1/3">
            <h1 className="text-primary font-black text-6xl capitalize">
                Crea Tu Cuenta Y Registrate A Eventos
            </h1>
        
            <form 
                onSubmit={handleSubmit}
                className="my-10 bg-white shadow rounded-lg p-10">

                <Input 
                    id={"name"}
                    labelText={"Nombre"}
                    placeholder={"Tu nombre"}/>

                <Input 
                    id={"phone"}
                    labelText={"Número de teléfono"}
                    placeholder={"Tu número de teléfono"}/>

                <Input 
                    id={"email"}
                    labelText={"Correo Electrónico"}
                    placeholder={"Correo electrónico de registro"}/>

                <Input 
                    id={"password"}
                    labelText={"Contraseña"}
                    placeholder={"Contraseña de registro"}/>

                <input
                    type="submit"
                    value="Crear Cuenta"
                    className="bg-primary mb-5 w-full py-3 text-white uppercase
                    font-bold rounded hover:cursor-pointer hover:bg-sky-800
                    transition-colors"
                />

                {
                    // msg && <Alerta alerta={alerta}/>
                }
            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    href="/login"
                    className="block text-center my-5 text-slate-500 uppercase
                    text-sm">
                    ¿Ya tienes una cuenta? <span className="text-primary">Inicia Sesi&oacute;n</span>
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

export default Register;
"use client"

import { Input } from "@/components/Input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { changePassword, checkToken } from "./services/newPassword.services";
import { notifyError } from "@/utilities/notifyError";
import { notifySuccess } from "@/utilities/notifySuccess";

const NewPassword = ({ params }) => {
    const [token, setToken] = useState(params.token);
    const [validToken, setValidToken] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordChanged, setPasswordChanged] = useState(false);

    const handlePasswordChange = (newPassword) => {
        setPassword(newPassword);
    };

    const handleConfirmPasswordChange = (newPassword) => {
        setConfirmPassword(newPassword);
    };

    useEffect(() => {
        const checkTokenEffect = async () => {
            try {
                await checkToken(token);
                setValidToken(true);
            } catch (error) {
                notifyError(error.response.data.msg);
            }
        }
        checkTokenEffect();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        if ([password, confirmPassword].includes("")) {
            notifyError("Todos los campos son requeridos");

            return;
        }

        if (password !== confirmPassword) {
            notifyError("Las contraseñas deben ser iguales");

            return;
        }

        try {
            const data = await changePassword(token, password)
            notifySuccess(data.msg);
            setPasswordChanged(true);
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            notifyError(error.response?.data.msg);
        }
    }

    return (
        <section className="w-full h-full flex items-center justify-center px-10 sm:px-20">
            <div className="w-full md:w-1/2">
                <h1 className="text-primary font-black text-6xl capitalize">
                    Recupera Tu Contraseña
                </h1>

                {
                    validToken
                        ? (
                            !passwordChanged ? (
                                <form
                                    onSubmit={handleSubmit}
                                    className="my-10 bg-white shadow rounded-lg p-10"
                                >

                                    <Input
                                        id={"password"}
                                        labelText={"Contraseña"}
                                        placeholder={"Nueva contraseña"}
                                        type="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />

                                    <Input
                                        id={"confirmPassword"}
                                        labelText={"Repite tu Contraseña"}
                                        placeholder={"Repite tu nueva contraseña"}
                                        type="password"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                    />

                                    <input
                                        type="submit"
                                        value="Cambiar Contraseña"
                                        className="bg-primary mb-5 w-full py-3 text-white uppercase
                        font-bold rounded hover:cursor-pointer hover:bg-darkPrimary
                        transition-colors"
                                    />

                                </form>
                            )
                                : (
                                    <Link
                                        href="/login"
                                        className="block text-center my-5 uppercase rounded-md
                                    text-sm border py-3 bg-primary text-white hover:bg-darkPrimary">
                                        Iniciar Sesión
                                    </Link>
                                )
                        )
                        : (
                            <h2 className="text-center text-xl mt-10">Token No Válido</h2>
                        )
                }
            </div>
        </section>
    );
}

export default NewPassword;
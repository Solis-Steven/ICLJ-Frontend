"use client"

import { useEffect, useState } from "react";
import { confirmAccount } from "./services/confirmAccount.services";
import { notifyError } from "@/utilities/notifyError";
import { notifySuccess } from "@/utilities/notifySuccess";
import Link from "next/link";


const Confirm = ({ params }) => {
    const [token, setToken] = useState(params.token)
    const [confirmedAccout, setConfirmedAccout] = useState(false);

    useEffect(() => {
        const confirmAccountEffect = async () => {
            try {
                const data = await confirmAccount(token);
                notifySuccess(data.msg);
                setConfirmedAccout(true)
            } catch (error) {
                console.log(error)
                notifyError(error.response.data.msg);
            }
        }
        confirmAccountEffect();
    }, []);


    return (
        <section className="w-full h-full flex items-center justify-center px-10 sm:px-20">
            <div className="w-full md:w-1/2">
                <h1 className="text-primary font-black text-6xl capitalize">
                    Confirma Tu Cuenta Y Regístrate A Eventos
                </h1>

                <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 bg-white rounded">
                    {
                        confirmedAccout
                            ? (
                                <Link
                                    href="/login"
                                    className="block text-center my-5 uppercase rounded-md
                                    text-sm border py-3 bg-primary text-white hover:bg-darkPrimary">
                                    Iniciar Sesión
                                </Link>
                            )
                            : (
                                <></>
                            )
                    }
                </div>
            </div>
        </section>
    );
}

export default Confirm;
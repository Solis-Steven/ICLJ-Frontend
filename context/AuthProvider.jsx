"use client"

import { useState, useEffect, createContext } from "react";
import { axiosClient } from "../config/axiosClient";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const signOut = () => {
        localStorage.removeItem("token")
        setAuth(null);
        router.push("/users/home")
    }

    useEffect(() => {
        const authenticateUser = async() => {
            const token = localStorage.getItem("token");
            
            if(token) {
                const config = {
                    headers: {
                        "Content-Type":  "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
                try {
                    const { data } = await axiosClient("/users/profile", config);
                    setAuth(data);
                } catch (error) {
                    setAuth({});
                    console.log("Error al autenticar usuario: ", error);
                }

            }
            setLoading(false);
        }
        authenticateUser();
    }, []);

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
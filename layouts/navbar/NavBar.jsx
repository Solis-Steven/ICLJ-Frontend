"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();

    return(
        <nav className="flex gap-3 items-center justify-center 
        absolute top-0 mt-10 text-white">
            <Link className="hover:text-primary" href="/users/home">
                Inicio
            </Link>

            <Link className="hover:text-primary" href="/users/about">
                Sobre Nosotros
            </Link>

            <Link className="hover:text-primary" href="/users/consolidationHouses">
                Casas de Consolidaci&oacute;n
            </Link>

            <Link className="hover:text-primary" href="/users/infantile">
                Infantil
            </Link>

            <Link className="hover:text-primary" href="/users/testimonials">
                Testimonios
            </Link>

            <Link className="hover:text-primary" href="/users/sermons">
                Sermones
            </Link>

            <button 
                type="button"
                className="bg-primary py-2 px-3 rounded-full text-white hover:bg-darkPrimary"
                onClick={() => router.push("/login")}>
                Iniciar Sesi&oacute;n
            </button>
        </nav>
    );
}

export default Navbar;
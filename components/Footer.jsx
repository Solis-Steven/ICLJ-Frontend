import Navbar from "@/layouts/navbar/NavBar";
import Link from "next/link";

export const Footer = () => {

    return (
        <footer className="text-white bg-tertiary mt-10 flex justify-between
        items-center p-14 flex-col lg:flex-row">
            <section>
                <p>Logo</p>
            </section>

            <nav className="flex flex-col lg:flex-row mt-4 gap-3 items-center justify-center">
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
            </nav>
        </footer>
    );
}
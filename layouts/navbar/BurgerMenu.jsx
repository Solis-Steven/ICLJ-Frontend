import React from 'react'
import Link from 'next/link';
import { useRouter } from "next/navigation";

const BurgerMenu = ({auth, signOut, setIsMenuOpen}) => {
    const router = useRouter();
    
    return (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-transparent text-black">
            <ul className="flex flex-col items-start ml-4">
                <NavItem setIsMenuOpen={setIsMenuOpen} href="/users/home">Inicio</NavItem>
                <NavItem setIsMenuOpen={setIsMenuOpen} href="/users/about">Sobre Nosotros</NavItem>
                <NavItem setIsMenuOpen={setIsMenuOpen} href="/users/consolidationHouses">Casas de Consolidaci&oacute;n</NavItem>
                <NavItem setIsMenuOpen={setIsMenuOpen} href="/users/infantile">Infantil</NavItem>
                <NavItem setIsMenuOpen={setIsMenuOpen} href="/users/testimonials">Testimonios</NavItem>
                <NavItem setIsMenuOpen={setIsMenuOpen} href="/users/sermons">Sermones</NavItem>
                { auth ?
                (
                    <button
                        type="button"
                        className="lg:inline-block lg:ml-auto text-white lg:mr-3 mt-2 py-2 px-2 
                        bg-primary hover:bg-darkPrimary text-sm 
                        rounded-full transition duration-200 whitespace-nowrap"
                        onClick={signOut}
                        >
                        Cerrar Sesión
                    </button>
                )
                :
                (
                    <button
                        type="button"
                        className="lg:inline-block lg:ml-auto text-white lg:mr-3 mt-2 py-2 px-2 
                        bg-primary hover:bg-darkPrimary text-sm 
                        rounded-full transition duration-200 whitespace-nowrap"
                        onClick={() => router.push('/login')}
                        >
                        Iniciar Sesión
                    </button>
                )}
                
            </ul>     
        </div>
    )
}

const NavItem = ({ href, children, setIsMenuOpen }) => (
    <li className="text-black mb-4">
        <Link href={href} onClick={() => setIsMenuOpen(false)}>
            <p className="text-sm hover:text-primary font-bold nowrap whitespace-nowrap">
                {children}
            </p>
        </Link>
    </li>
);
    

export default BurgerMenu
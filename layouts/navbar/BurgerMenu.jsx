import React from 'react'
import Link from 'next/link';
import { useRouter } from "next/navigation";

const BurgerMenu = ({user, signOut}) => {
    const router = useRouter();
    
    return (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-transparent text-black">
            <ul className="flex flex-col items-start ml-4">
                <NavItem href="/users/home">Home</NavItem>
                <NavItem href="/users/about">Sobre Nosotros</NavItem>
                <NavItem href="/users/consolidationHouses">Casas de Consolidaci&oacute;n</NavItem>
                <NavItem href="/users/infantile">Infantil</NavItem>
                <NavItem href="/users/testimonials">Testimonios</NavItem>
                <NavItem href="/users/sermons">Sermones</NavItem>
                {user?
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

const NavItem = ({ href, children }) => (
    <li className="text-black mb-4">
        <Link href={href}>
            <h1 className="text-sm hover:text-primary font-bold nowrap whitespace-nowrap">
                {children}
            </h1>
        </Link>
    </li>
);
    

export default BurgerMenu
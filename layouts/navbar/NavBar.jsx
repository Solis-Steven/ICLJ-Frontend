"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const handleToggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    return (
        <nav className="flex gap-3 items-center justify-center 
                 absolute top-0 mt-10 text-white">
        <div className="lg:hidden">
          <button
            className="navbar-burger flex items-center p-3"
            onClick={handleToggleMenu}
          >
            {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            )}
          </button>
          {isMenuOpen && (
            <div className="lg:hidden absolute top-16 left-0 right-0 bg-transparent text-black">
                <ul className="flex flex-col items-center">
                    <NavItem href="/users/home">Home</NavItem>
                    <NavItem href="/users/about">Sobre Nosotros</NavItem>
                    <NavItem href="/users/consolidationHouses">Casas de Consolidaci&oacute;n</NavItem>
                    <NavItem href="/users/infantile">Infantil</NavItem>
                    <NavItem href="/users/testimonials">Testimonios</NavItem>
                    <NavItem href="/users/sermons">Sermones</NavItem>
                    <button
                        type="button"
                        className="lg:inline-block lg:ml-auto text-white lg:mr-3 mt-3 py-2 px-6 
                        bg-primary hover:bg-darkPrimary text-sm text-gray-900 
                        rounded-full transition duration-200 whitespace-nowrap"
                        onClick={() => router.push('/login')}
                        >
                        Iniciar Sesión
                    </button>
                </ul>
                
            </div>
          )}
        </div>
        <ul className="hidden lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <NavItem href="/users/home">Home</NavItem>
          <NavItem href="/users/about">Sobre Nosotros</NavItem>
          <NavItem href="/users/consolidationHouses">Casas de Consolidaci&oacute;n</NavItem>
          <NavItem href="/users/infantile">Infantil</NavItem>
          <NavItem href="/users/testimonials">Testimonios</NavItem>
          <NavItem href="/users/sermons">Sermones</NavItem>
        </ul>
        <button
          type="button"
          className="hidden lg:inline-block lg:ml-auto text-white lg:mr-3 py-2 px-6 
          bg-primary hover:bg-darkPrimary text-sm text-gray-900 rounded-full transition duration-200"
          onClick={() => router.push('/login')}
        >
          Iniciar Sesi&oacute;n
        </button>
      </nav>
    );
  };
  
  const NavItem = ({ href, children }) => (
    <li className="text-gray-300">
        <Link href={href}>
            <h1 className="text-sm hover:text-primary font-bold nowrap whitespace-nowrap">
                {children}
            </h1>
        </Link>
    </li>
);
  
  export default Navbar;
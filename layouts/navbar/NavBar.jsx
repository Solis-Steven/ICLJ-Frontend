"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BurgerMenu from './BurgerMenu';

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
      <nav className="flex gap-3 items-center justify-center absolute top-0 mt-10 text-white">
        <ul className="hidden lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
          <Link className="hover:text-primary" href="/users/home">Inicio</Link>
          <Link className="hover:text-primary" href="/users/about">Sobre Nosotros</Link>
          <Link className="hover:text-primary" href="/users/consolidationHouses">Casas de Consolidaci&oacute;n</Link>
          <Link className="hover:text-primary" href="/users/infantile">Infantil</Link>
          <Link className="hover:text-primary" href="/users/testimonials">Testimonios</Link>
          <Link className="hover:text-primary" href="/users/sermons">Sermones</Link>
        </ul>
        <button
          type="button"
          className="hidden lg:inline-block lg:ml-auto text-white lg:mr-3 py-2 px-6 
          bg-primary hover:bg-darkPrimary text-sm rounded-full transition duration-200"
          onClick={() => router.push('/login')}
        >
          Iniciar Sesi&oacute;n
        </button>
        <section>
          <div className="fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0">
            <button
              className="right-0"
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
                <BurgerMenu />
            )}
          </div>
        </section>
    </nav>
  );
};


export default Navbar;
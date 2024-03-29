"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import clsx from "clsx";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signOut, auth } = useAuth();

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleClick = () => {
    if (auth) {
      signOut();
    } else {
      router.push("/login");
    }
  };

  return (
    <nav className="z-50 gap-3 items-center w-full absolute top-0 mt-10 text-white">
      <div className="flex justify-evenly items-center">
        <Link className="hidden lg:inline" href="/users/home">
          <Image
            src="/logo.webp"
            alt="logotipo de la iglesia"
            width={50}
            height={50}
          />
        </Link>
        <div className="flex gap-6">
          <ul className="hidden lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
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
          </ul>
          <button
            type="button"
            className="hidden lg:inline-block lg:ml-auto text-white lg:mr-3 py-2 px-6 
              bg-primary hover:bg-darkPrimary text-sm rounded-full transition duration-200"
            onClick={handleClick}
          >
            {
              auth?._id ? "Cerrar Sesión" : "Iniciar Sesión"
            }
          </button>
        </div>
      </div>

      <div
        className={clsx(`h-full w-screen 
        lg:hidden top-0 right-0 absolute
        `)}
      >
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute top-4 right-4 lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      <section>
        <div
          className={clsx(
            `fixed h-full w-screen 
          lg:hidden bg-black/50 top-0 left-0 z-50
          translate-x-full transition-transform 
          transform`,
            isMenuOpen && "-translate-x-0"
          )}
        >
          <section
            className="text-black bg-white flex-col absolute right-0 
            top-0 h-screen p-36 gap-8 z-50 flex rounded-s-xl"
          >
            <button
              onClick={handleToggleMenu}
              className="absolute top-4 right-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            {isMenuOpen && <BurgerMenu setIsMenuOpen={setIsMenuOpen} auth={auth} signOut={signOut} />}
          </section>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;

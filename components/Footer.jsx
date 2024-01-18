import Image from "next/image";
import Link from "next/link";

export const Footer = () => {

    return (
        <footer className="text-white bg-tertiary flex justify-between
        items-center py-14 lg:px-40 xl:px-60 flex-col lg:flex-row">
            <section className="flex flex-col items-center">
                <Link href="/users/home">
                    <Image
                        src="/LOGOTIPO-_1__page-0001.webp"
                        alt="logotipo de la iglesia"
                        width={80}
                        height={80}
                    />
                </Link>

                <section className="flex gap-2 mt-3">
                    <Link
                        href={"https://www.instagram.com/iglesiacasadeluzjireh?igsh=MWxpc2Z6c2Z3enZqdA=="}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 24 24">
                            <path fill="#FFFFFF" d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"></path>
                        </svg>
                    </Link>
                    <Link
                        href={"https://www.facebook.com/IglesiaCasadeLuzJireh"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 30 30">
                            <path fill="#FFF" d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"></path>
                        </svg>
                    </Link>
                </section>

            </section>

            <nav className="flex flex-col lg:flex-row gap-3 items-center justify-center">
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
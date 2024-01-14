import { Footer } from "@/components/Footer";
import Navbar from "@/layouts/navbar/NavBar";

const Layout = ({ children }) => {
    return (
        <section >
            <header className="flex justify-center">
                <img
                    src="/bg.jpg"
                    alt="Imagen de fondo"
                    className="top-0 left-0 w-full h-96 object-cover relative -z-10"
                />
                <Navbar />
                <h2 className="absolute text-white top-40 left-20 text-xl font-bold">Casa de Luz Jireh</h2>
                <h1 className="absolute text-white top-48 left-20 text-5xl font-bold">Donde los milagros ocurren</h1>
            </header>

            <main className="relative z-10 h-full px-10">
                {children}
            </main>

            <Footer />
        </section>
    );
}

export default Layout;

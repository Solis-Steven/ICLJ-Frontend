import { Footer } from "@/components/Footer";
import New from "@/components/New";
import Navbar from "@/layouts/navbar/NavBar";

const Layout = ({ children }) => {
    return (
        <section>
            <header className="flex justify-center">
                <img
                    src="/bg.jpg"
                    alt="Imagen de fondo"
                    className="top-0 left-0 w-full h-96 object-cover relative -z-10"
                />
                <Navbar />
                
            </header>
            <main className="relative z-10 h-full">
                {children}
            </main>

            <Footer />
        </section>
    );
}

export default Layout;

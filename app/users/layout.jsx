import { Footer } from "@/components/Footer";
import Navbar from "@/layouts/navbar/NavBar";

const Layout = ({ children }) => {
    return (
        <section>
            <header className="">
                <Navbar />
            </header>
            <main className="relative h-full">
                {children}
            </main>

            <Footer />
        </section>
    );
}

export default Layout;

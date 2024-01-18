import SitesSection from "./sites/SitesSection"
import ActivitiesSection from "./activities/ActivitiesSection";
const Home = () => {

    return (
        <>
            <section>
                <img
                    src="/bg.jpg"
                    alt="Imagen de fondo"
                    className="top-0 left-0 w-full h-96 object-cover relative"
                />

                <div className="z-10 absolute top-40 left-10 ">
                    <p className="text-white text-lg">Casa de Luz Jireh</p>
                    <h1 className="text-white text-4xl font-bold">Donde los milagros ocurren</h1>
                </div>
            </section>
            <SitesSection />
            <ActivitiesSection />
            <h1>Inicio</h1>

        </>
    );
}

export default Home;
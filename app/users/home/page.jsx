import SitesSection from "./sites/SitesSection";
import ActivitiesSection from "./activities/ActivitiesSection";
import { Bot } from "./chatbot/bot.js";
import { Gallery } from "./multimedia/Gallery";
import EventView from "./regularEvents/EventView";

const Home = () => {

    return (
        <>
            <section>
                <img
                    src="/inicio.jpg"
                    alt="Imagen de fondo"
                    className="top-0 left-0 w-full h-96 object-cover object-center relative"
                />

                <div className="z-10 absolute top-40 left-10 ">
                    <p className="text-white text-lg">Casa de Luz Jireh</p>
                    <h1 className="text-white text-4xl font-bold">Donde los milagros ocurren</h1>
                </div>
            </section>

            <EventView />
            <SitesSection />
            <ActivitiesSection />
            <Gallery />
            <Bot />
        </>
    );
}

export default Home;

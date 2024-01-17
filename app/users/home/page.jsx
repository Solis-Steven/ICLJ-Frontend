import SitesSection from "./sites/SitesSection"
import ActivitiesSection from "./activities/ActivitiesSection";
import { Bot } from "./chatbot/bot.js";
const Home = () => {
    
    return(
        <>  
            <SitesSection />
            <ActivitiesSection/>
            <h1>Inicio</h1>
            
        </>
    );
}

export default Home;

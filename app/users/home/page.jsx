import New from "@/components/New";
import SitesSection from "./sites/SitesSection"
import ActivitiesSection from "./activities/ActivitiesSection";
const Home = () => {
    
    return(
        <>  
            {/* <New /> */}
            <SitesSection />
            <ActivitiesSection/>
            <h1>Inicio</h1>
            
        </>
    );
}

export default Home;
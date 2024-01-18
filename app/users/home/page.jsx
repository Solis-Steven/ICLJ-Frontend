
import SitesSection from "./sites/SitesSection";
import ActivitiesSection from "./activities/ActivitiesSection";
import { Bot } from "./chatbot/bot.js";
import { Gallery } from "./multimedia/Gallery";
import EventView from "./regularEvents/EventView";
const Home = () => {
  return (
    <>
      <EventView />
      <SitesSection />
      <ActivitiesSection />
      <Gallery />
      <Bot />
    </>
  );
};
export default Home;

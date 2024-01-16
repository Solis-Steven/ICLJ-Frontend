import New from "@/components/New";
import SitesSection from "./sites/SitesSection";
import ActivitiesSection from "./activities/ActivitiesSection";
import { Bot } from "./chatbot/bot.js";
const Home = () => {
  return (
    <>
      {/*<New /> */}
      <SitesSection />
      <ActivitiesSection />
      <Bot />
    </>
  );
};

export default Home;

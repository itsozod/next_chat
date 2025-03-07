import ChatMessages from "@/pages/home/ui/ChatMessages";
import MobileContent from "@/widgets/mobile/mobileContent/MobileContent";
import { useMediaQuery } from "@uidotdev/usehooks";

const Home = () => {
  const isMediumDevice = useMediaQuery("only screen and (max-width: 768px)");
  return isMediumDevice ? <MobileContent /> : <ChatMessages />;
};

export default Home;

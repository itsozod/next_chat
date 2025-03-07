import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import Content from "./content/Content";
import ChatHeader from "../../features/chat/ui/chatHeader/ChatHeader";
import { useMediaQuery } from "@uidotdev/usehooks";

const Layout = () => {
  const isMediumDevice = useMediaQuery("only screen and (min-width: 768px)");

  return (
    <div className="flex">
      {isMediumDevice && <Sidebar />}
      <div className="flex flex-col w-full">
        <Header />
        {isMediumDevice && <ChatHeader />}
        <Content>
          <Outlet />
        </Content>
      </div>
    </div>
  );
};

export default Layout;

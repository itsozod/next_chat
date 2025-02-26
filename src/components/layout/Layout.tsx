import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import Content from "./content/Content";
import ChatHeader from "@/components/layout/chatHeader/ChatHeader";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <ChatHeader />
        <Content>
          <Outlet />
        </Content>
      </div>
    </div>
  );
};

export default Layout;

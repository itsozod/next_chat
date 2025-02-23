import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import Content from "./content/Content";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <Content>
          <Outlet />
        </Content>
      </div>
    </div>
  );
};

export default Layout;

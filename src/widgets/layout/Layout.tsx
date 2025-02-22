import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { Content } from "./content";

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

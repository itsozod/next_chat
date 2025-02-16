import { ReactNode } from "react";
import Header from "../header/Header";
import Sidebar from "../Sidebar/Sidebar";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex justify-center w-full">{children}</div>
      </div>
    </div>
  );
};

export default Wrapper;

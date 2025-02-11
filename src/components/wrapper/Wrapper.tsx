import { ReactNode } from "react";
import Header from "../header/Header";
import Sidebar from "../Sidebar/Sidebar";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full flex flex-col">
      <Header />
      <div className="w-full gap-5 flex h-svh">
        <Sidebar />
        <div className="w-full flex justify-center h-svh">
          <div className="bg-[#01161e] w-full ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;

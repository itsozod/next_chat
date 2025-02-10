import { ReactNode } from "react";
import Header from "../header/Header";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-[100vh] flex flex-col">
      <Header />
      <div className="bg-[#01161e] h-[100vh]">{children}</div>
    </div>
  );
};

export default Wrapper;

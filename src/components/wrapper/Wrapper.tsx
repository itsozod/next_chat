import { ReactNode } from "react";
import Header from "../header/Header";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="bg-[#fff] h-[100vh] flex flex-col">
        <Header />
        <div>{children}</div>
      </div>
    </>
  );
};

export default Wrapper;

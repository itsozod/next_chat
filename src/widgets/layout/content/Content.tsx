import { ReactNode } from "react";

const Content = ({ children }: { children: ReactNode }) => {
  return <div className="flex justify-center w-full">{children}</div>;
};

export default Content;

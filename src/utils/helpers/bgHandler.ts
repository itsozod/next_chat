import { Messages } from "../../hooks/SocketProvider";

export const bgHandler = (message: Messages, userId: number) => {
  return message?.id === userId ? "bg-[#124c12]" : "bg-[blue]";
};

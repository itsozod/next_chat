import { Messages } from "../../hooks/SocketProvider";

export const marginHandler = (message: Messages, userId: number) => {
  return message?.id === userId ? "ml-auto" : "mr-auto";
};

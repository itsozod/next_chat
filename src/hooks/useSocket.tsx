import { useContext } from "react";
import { Messages, SocketContext } from "./SocketProvider";
import { Socket } from "socket.io-client";

interface UseSocketReturn {
  socket: Socket;
  messages: Messages[];
  setMessages: React.Dispatch<React.SetStateAction<Messages[]>>;
}

const useSocket = (): UseSocketReturn => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export default useSocket;

import { ReactNode, createContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | string;
  messages: Messages[];
  setMessages: React.Dispatch<React.SetStateAction<Messages[]>>;
}

export interface Messages {
  id: number | string | null;
  message: string;
  username: string | null;
  messageId: number;
}

export const SocketContext = createContext<SocketContextType | null>(null);
const socket = "";
// const socket = io("http://localhost:3002");

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Messages[]>([]);
  // const { token } = useToken();
  // const { id } = tokenParser();

  // useEffect(() => {
  //   if (token) {
  //     socket.on("notify", (data: Messages) => {
  //       if (data?.id !== id) {
  //         toast.success(`${data?.username}: ${data?.message}`, {
  //           position: "top-right",
  //         });
  //       }
  //     });

  //     socket.on("receive_message", (data: Messages) => {
  //       const messageObj = {
  //         id: data?.id,
  //         message: data?.message,
  //         username: data?.username,
  //         messageId: data?.messageId,
  //       };

  //       setMessages((prev) => [...prev, messageObj]);
  //     });
  //   }

  //   return () => {
  //     socket.off("notify");
  //     socket.off("receive_message");
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [token]);
  return (
    <SocketContext.Provider value={{ socket, messages, setMessages }}>
      <ToastContainer />
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

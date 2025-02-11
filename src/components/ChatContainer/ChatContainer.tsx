import { ReactNode, useEffect, useRef } from "react";
import { useSocketStore } from "@/shared/store/socket.store";

const ChatContainer = ({ children }: { children: ReactNode }) => {
  const { messages, setPage } = useSocketStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    setPage(1);
  }, []);

  useEffect(() => {
    if (messages.length <= 10 && containerRef.current) {
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      style={{
        scrollbarWidth: "none",
      }}
      className="flex flex-col border border-red-500 h-[600px] overflow-auto w-[100%] max-w-[600px] gap-2 p-1"
    >
      {children}
    </div>
  );
};

export default ChatContainer;

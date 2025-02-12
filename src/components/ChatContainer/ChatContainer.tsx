import { ReactNode, useEffect, useRef } from "react";
import useMessages from "@/shared/hooks/useMessages";

const ChatContainer = ({ children }: { children: ReactNode }) => {
  const { messages } = useMessages();
  const containerRef = useRef<HTMLDivElement>(null);
  const previousScrollHeightRef = useRef(0);
  const { isValidating, size, setSize, isLastPage } = useMessages();

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
  }, []);

  useEffect(() => {
    if (messages?.length <= 10 && containerRef.current) {
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    }
  }, [messages]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (isLastPage) return;

    if (container?.scrollTop <= 10 && !isValidating) {
      previousScrollHeightRef.current = container.scrollHeight;
      setSize(size + 1); // Fetch the next page
    }
  };

  return (
    <div
      onScroll={handleScroll}
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

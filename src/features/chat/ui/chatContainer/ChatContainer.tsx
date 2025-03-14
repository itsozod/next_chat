import { ReactNode, useEffect, useRef } from "react";
import useMessages from "@/shared/hooks/useMessages";

const ChatContainer = ({ children }: { children: ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousScrollHeightRef = useRef(0);
  const { messages, isValidating, size, setSize, isLastPage } = useMessages();

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
  }, []);

  useEffect(() => {
    if (messages?.length <= 10 && containerRef.current) {
      containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
    } else if (containerRef.current && previousScrollHeightRef.current) {
      const container = containerRef.current;
      const newScrollHeight = container.scrollHeight;
      const scrollDifference =
        newScrollHeight - previousScrollHeightRef.current;
      container.scrollTop += scrollDifference;
    }
  }, [messages]);

  const handleScroll = () => {
    if (isLastPage) return;
    const container = containerRef.current;

    if (container?.scrollTop === 0 && !isValidating) {
      previousScrollHeightRef.current = container.scrollHeight;
      setSize(size + 1);
    }
  };

  return (
    <div
      onScroll={handleScroll}
      ref={containerRef}
      className="no-scrollbar w-full h-[100vh] flex flex-col gap-3 overflow-y-auto p-4 max-w-[1024px]"
    >
      {children}
    </div>
  );
};

export default ChatContainer;

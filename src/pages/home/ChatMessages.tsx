import ChatContainer from "@/components/chatContainer/ChatContainer";
import Messages from "@/components/messages/Messages";
import MessageInput from "@/features/sendMessage/ui/MessageInput";
import Empty from "@/pages/home/Empty";
import TopLoader from "@/pages/home/TopLoader";
import useMessages from "@/shared/hooks/useMessages";
import useWebSockets from "@/shared/hooks/useWebSockets";
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";

const ChatMessages = () => {
  const { data } = useSWR("/user/me");
  const { isValidating } = useMessages();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [search] = useSearchParams();

  const scrollToBottom = () => {
    setTimeout(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  useWebSockets({ scrollToBottom });

  return (
    <div className="w-full flex justify-start flex-col items-center">
      {search.get("room_id") ? (
        <>
          <ChatContainer>
            <TopLoader isValidating={isValidating} />
            <Messages id={data?.data?.id} />
            <div ref={bottomRef}></div>
          </ChatContainer>
          <MessageInput scrollToBottom={scrollToBottom} />
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default ChatMessages;

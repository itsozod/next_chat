import useSWR from "swr";
import Loader from "@/shared/ui/loader/Loader";
import useMessages from "@/shared/hooks/useMessages";
import ChatMessages from "@/components/messages/ChatMessages";
import MessageInput from "@/components/messageInput/MessageInput";
import ChatContainer from "@/components/chatContainer/ChatContainer";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";
import useWebSockets from "@/shared/hooks/useWebSockets";

const Home = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [search] = useSearchParams();
  const { data } = useSWR("/user/me");
  const { isValidating } = useMessages();

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
            {isValidating && (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            )}
            <ChatMessages id={data?.data?.id} />
            <div ref={bottomRef}></div>
          </ChatContainer>
          <MessageInput scrollToBottom={scrollToBottom} />
        </>
      ) : (
        <div className="text-color">No messages yet, start a chat</div>
      )}
    </div>
  );
};

export default Home;

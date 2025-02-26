import ChatContainer from "@/components/chatContainer/ChatContainer";
import MessageInput from "@/components/messageInput/MessageInput";
import Messages from "@/components/messages/Messages";
import NoChatSelected from "@/components/NoChatSelected/NoChatSelected";
import TopLoader from "@/pages/home/ui/TopLoader";
import useMessages from "@/shared/hooks/useMessages";
import useScrollBottom from "@/shared/hooks/useScrollBottom";
import useWebSockets from "@/shared/hooks/useWebSockets";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";

const ChatMessages = () => {
  const { data } = useSWR("/user/me");
  const { isValidating } = useMessages();
  const { ref } = useScrollBottom();
  const [search] = useSearchParams();

  useWebSockets();

  if (!search.get("room_id")) return <NoChatSelected />;

  return (
    <div className="w-full flex justify-between h-[100dvh] flex-col items-center bg-[#EDF2F7] dark:bg-black ">
      <ChatContainer>
        <TopLoader isValidating={isValidating} />
        <Messages id={data?.data?.id} />
        <div ref={ref}></div>
      </ChatContainer>
      <MessageInput />
    </div>
  );
};

export default ChatMessages;

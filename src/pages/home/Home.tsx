import { useEffect, useRef } from "react";
import useSWR from "swr";
import useInfiniteScroll from "@/shared/hooks/useInfiniteScroll";
import Loader from "@/shared/ui/loader/Loader";
import useMessages from "@/shared/hooks/useMessages";
import { useSocketStore } from "@/shared/store/socket.store";
import ChatMessages from "@/components/Messages/ChatMessages";
import MessageInput from "@/components/MessageInput/MessageInput";
import ChatContainer from "@/components/ChatContainer/ChatContainer";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useSearchParams } from "react-router-dom";
import { error } from "console";

const Home = () => {
  const [search] = useSearchParams();
  const { messages, setSocket, setMessages } = useSocketStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data } = useSWR("http://5.253.62.94:8084/user/me");
  const {
    roomsMessages,
    setSize,
    size,
    isValidating,
    isLastPage,
    isLoading,
    error,
  } = useMessages();
  const { handleLoaderRef } = useInfiniteScroll(
    setSize,
    size,
    isValidating,
    isLastPage,
    isLoading
  );

  const scrollToBottom = () => {
    setTimeout(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  useEffect(() => {
    if (!data || !search.get("room_id")) return;
    const socket = new WebSocket(
      `ws://5.253.62.94:8084/ws?room_id=${search.get("room_id")}&user_id=${data?.data?.id}`
    );
    setSocket(socket);

    socket.onopen = () => {
      console.log("Connected!!!");
    };

    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
      setMessages((prev) => [JSON.parse(event.data), ...prev]);
      scrollToBottom();
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      socket?.close();
    };
  }, [data, search]);

  useEffect(() => {
    if (roomsMessages) {
      const newMessages = roomsMessages.flatMap((mess) => mess.data?.messages);
      setMessages((prevMessages) => {
        const messageIds = new Set(prevMessages.map((msg) => msg.id));
        const uniqueMessages = newMessages.filter(
          (msg) => !messageIds.has(msg.id)
        );
        return [...prevMessages, ...uniqueMessages];
      });
    }
  }, [roomsMessages]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Loader />;
      </div>
    );

  return (
    <>
      <div className="h-[100vh]">
        <Sidebar />
        {!error && (
          <div className="flex justify-start p-2 gap-4 flex-col items-center h-svh">
            {search.get("room_id") ? (
              <>
                <ChatContainer>
                  <div ref={handleLoaderRef}></div>
                  {isValidating && (
                    <div className="flex justify-center items-center">
                      <Loader />
                    </div>
                  )}
                  <ChatMessages id={data?.data?.id} messages={messages} />
                  <div ref={bottomRef}></div>
                </ChatContainer>
                <MessageInput scrollToBottom={scrollToBottom} />
              </>
            ) : (
              <div className="text-white">No messages yet, start a chat</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

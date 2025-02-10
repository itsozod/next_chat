import { useEffect, useMemo, useRef } from "react";
import useSWR from "swr";
import useInfiniteScroll from "@/shared/hooks/useInfiniteScroll";
import { useSocketStore } from "@/shared/store/socket.store";
import MessageInput from "@/components/MessageInput/MessageInput";
import useMessages from "@/shared/hooks/useMessages";
import ChatContainer from "@/components/ChatContainer/ChatContainer";
import Messages from "@/components/Messages/Messages";

const Home = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { messages, setSocket, setMessages } = useSocketStore();
  const { data } = useSWR("http://5.253.62.94:8084/user/me");
  const { roomsMessages, setSize, size, isValidating, isLastPage, isLoading } =
    useMessages();
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
    if (!data) return;
    const socket = new WebSocket(
      `ws://5.253.62.94:8084/ws?room_id=4&user_id=${data?.data?.id}`
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
  }, [data]);

  useEffect(() => {
    if (roomsMessages) {
      const newMessages = roomsMessages?.flatMap(
        (mess) => mess?.data?.messages
      );
      setMessages((prevMessages) => {
        const messageIds = new Set(prevMessages.map((msg) => msg.id));
        const uniqueMessages = newMessages.filter(
          (msg) => !messageIds.has(msg.id)
        );
        return [...prevMessages, ...uniqueMessages];
      });
    }
  }, [roomsMessages]);

  const messageParser = useMemo(() => {
    return messages
      ?.slice()
      .reverse()
      .map((mess) => {
        return <Messages id={data?.data?.id} message={mess} />;
      });
  }, [messages, data]);

  if (isLoading) return <div>Loading</div>;

  return (
    <>
      <div className="flex justify-start p-2 gap-4 flex-col bg-[#01161e] items-center h-svh">
        <h1
          style={{
            fontFamily: "Playwrite IE, cursive",
            fontOpticalSizing: "auto",
            fontWeight: "bolder",
            fontStyle: "normal",
          }}
          className="text-center text-white text-2xl"
        >
          Welcome, {data?.data?.fullname}
        </h1>
        <ChatContainer>
          {isValidating ? (
            <div>Loading</div>
          ) : (
            <div ref={handleLoaderRef}></div>
          )}
          {messageParser}
          <div ref={bottomRef}></div>
        </ChatContainer>
        <MessageInput scrollToBottom={scrollToBottom} />
      </div>
    </>
  );
};

export default Home;

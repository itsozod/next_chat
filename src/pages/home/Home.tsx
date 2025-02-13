import useSWR from "swr";
import Loader from "@/shared/ui/loader/Loader";
import useMessages from "@/shared/hooks/useMessages";
import { useSocketStore } from "@/shared/store/socket.store";
import ChatMessages from "@/components/Messages/ChatMessages";
import MessageInput from "@/components/MessageInput/MessageInput";
import ChatContainer from "@/components/ChatContainer/ChatContainer";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { RoomMessagesData } from "@/shared/types";

const Home = () => {
  const [search] = useSearchParams();
  const { setSocket } = useSocketStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data } = useSWR("/user/me");
  const { isValidating, mutate } = useMessages();

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
      const parsed = JSON.parse(event.data);
      if (parsed?.room_id === Number(search.get("room_id"))) {
        mutate((existingData: RoomMessagesData[] | undefined) => {
          if (!existingData) return undefined;
          const updatedData = { ...existingData };
          const data = {
            data: {
              messages: [
                JSON.parse(event.data),
                ...updatedData?.[0]?.data?.messages,
              ],
              total_count: updatedData?.[0]?.data?.total_count + 1,
            },
          };

          return [data];
        }, false);
        scrollToBottom();
      }
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
    if (search.get("room_id")) {
      mutate();
    }
  }, [search]);

  return (
    <div className="flex justify-start p-2 gap-4 flex-col items-center h-svh">
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
        <div className="text-white">No messages yet, start a chat</div>
      )}
    </div>
  );
};

export default Home;

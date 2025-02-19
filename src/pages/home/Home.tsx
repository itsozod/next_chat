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
import toast from "react-hot-toast";

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
      `${import.meta.env.VITE_BASE_URL_SOCKET}/ws?room_id=${search.get("room_id")}&user_id=${data?.data?.id}`
    );
    setSocket(socket);

    socket.onopen = () => {
      console.log("Connected!!!");
      toast.success("Connected");
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
                {
                  ...parsed,
                  sender_name: parsed?.sender_fullname,
                },
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
      socket?.close(1000, "Normal closure");
    };
  }, [data, search]);

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

import { useEffect } from "react";
import { useSocketStore } from "../../entities/socket/model/socket.store";
import { useSearchParams } from "react-router-dom";
import * as I from "@/entities";
import useSWR from "swr";
import useMessages from "./useMessages";
import useScrollBottom from "@/shared/hooks/useScrollBottom";

const useWebSockets = () => {
  const { data } = useSWR("/user/me");
  const [search] = useSearchParams();
  const { setSocket } = useSocketStore();
  const { mutate } = useMessages();
  const { scrollToBottom } = useScrollBottom();

  useEffect(() => {
    if (!data || !search.get("room_id")) return;
    const socket = new WebSocket(
      `${import.meta.env.VITE_BASE_URL_SOCKET}/ws?room_id=${search.get("room_id")}&user_id=${data?.data?.id}`
    );
    setSocket(socket);

    socket.onopen = () => {
      console.log("Connected!!!");
    };

    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
      const parsed = JSON.parse(event.data);

      if (parsed?.room_id === Number(search.get("room_id"))) {
        mutate((existingData: I.RoomMessagesData[] | undefined) => {
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
};

export default useWebSockets;

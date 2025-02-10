import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import SendIcon from "../../assets/icons/SendIcon";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import useSWR from "swr";
import { tokenInstance } from "@/utils/helpers/token/tokenInstance";
import useSWRInfinite from "swr/infinite";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
interface Message {
  id: number;
  sender_id: number;
  message: string;
  sender_name: string;
  username: string;
}

const Home = () => {
  const messageContainerRef = useRef(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data } = useSWR("http://5.253.62.94:8084/user/me");
  const [messages, setMessages] = useState<Message[]>([]);
  const {
    data: roomsMessages,
    isLoading,
    isValidating,
    setSize,
    size,
  } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      pageIndex = pageIndex + 1;

      if (previousPageData && isLastPage) return null;
      return `http://5.253.62.94:8084/room/messages?room_id=4&page=${pageIndex}`;
    },
    {
      revalidateFirstPage: false,
    }
  );

  const isLastPage = messages?.length >= roomsMessages?.[0]?.data?.total_count;

  const { handleLoaderRef } = useInfiniteScroll(
    setSize,
    size,
    isValidating,
    isLastPage,
    isLoading
  );
  const [message, setMessage] = useState("");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!data) return;
    ws.current = new WebSocket(
      `ws://5.253.62.94:8084/ws?room_id=4&user_id=${data?.data?.id}`
    );

    ws.current.onopen = () => {
      console.log("Connected!!!");
    };

    ws.current.onmessage = (event) => {
      console.log("Message from server:", event.data);
      setMessages((prev) => [JSON.parse(event.data), ...prev]);
      setTimeout(() => {
        if (bottomRef.current) {
          bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      ws.current?.close();
    };
  }, [data]);

  const handleMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const mess = {
        token: tokenInstance.getToken(),
        message: message,
      };
      const messClient = {
        message: message,
        sender_id: data?.data?.id,
        sender_name: data?.data?.username,
      };
      ws.current.send(JSON.stringify(mess));
      setMessages((prev) => [messClient as Message, ...prev]);
      setMessage("");
      setTimeout(() => {
        if (bottomRef.current) {
          bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    } else {
      console.error("WebSocket is not open.");
    }
  };

  const messageParser = useMemo(() => {
    return messages
      ?.slice()
      .reverse()
      .map((mess) => {
        return (
          <div
            key={mess?.id}
            className={`${mess?.sender_id === data?.data?.id ? "bg-[#124c12]" : "bg-[blue]"} ${mess?.sender_id === data?.data?.id ? "ml-auto" : "mr-auto"} p-4 rounded-md text-white`}
          >
            <p>{mess?.message}</p>
            <p>{mess?.sender_name}</p>
          </div>
        );
      });
  }, [messages, data]);

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

  useEffect(() => {
    if (messages.length <= 20 && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
        <div
          ref={messageContainerRef}
          style={{
            scrollbarWidth: "none",
          }}
          className="flex flex-col border border-red-500 h-[500px] overflow-auto w-[100%] max-w-[600px] gap-2 p-1"
        >
          <div ref={handleLoaderRef}></div>
          {messageParser}
          <div ref={bottomRef}></div>
        </div>
        <form onSubmit={handleMessage} className="w-full max-w-[600px]">
          <div className="flex gap-1 justify-between mt-2">
            <Input
              placeholder="Send a message"
              classNames={{
                inputWrapper: ["bg-[#292929]"],
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              className="bg-[red] rounde rounded-full p-2"
              isIconOnly
              type="submit"
            >
              <SendIcon />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Home;

import SendIcon from "@/assets/icons/SendIcon";
import { useSocketStore } from "@/shared/store/socket.store";
import { tokenInstance } from "@/utils/helpers/token/tokenInstance";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import * as I from "@/shared/types";

const MessageInput = ({ scrollToBottom }: { scrollToBottom: () => void }) => {
  const { data } = useSWR("http://5.253.62.94:8084/user/me");
  const [message, setMessage] = useState("");
  const { socket, setMessages } = useSocketStore();

  const handleMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (socket && socket.readyState === WebSocket.OPEN) {
      const mess = {
        token: tokenInstance.getToken(),
        message: message,
      };
      const messClient = {
        message: message,
        sender_id: data?.data?.id,
        sender_name: data?.data?.username,
      };
      socket.send(JSON.stringify(mess));
      setMessages((prev) => [messClient as I.Message, ...prev]);
      setMessage("");
      scrollToBottom();
    } else {
      console.error("WebSocket is not open.");
    }
  };

  return (
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
  );
};

export default MessageInput;

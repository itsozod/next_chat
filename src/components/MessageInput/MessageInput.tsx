import SendIcon from "@/shared/assets/icons/SendIcon";
import { useSocketStore } from "@/shared/store/socket.store";
import { tokenInstance } from "@/utils/helpers/token/tokenInstance";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { FormEvent, useRef, useState } from "react";
import useSWR from "swr";
import useMessages from "@/shared/hooks/useMessages";
import { RoomMessagesData } from "@/shared/types";
import toast from "react-hot-toast";

const MessageInput = ({ scrollToBottom }: { scrollToBottom: () => void }) => {
  const { data } = useSWR("/user/me");
  const [message, setMessage] = useState("");
  const { socket } = useSocketStore();
  const { mutate } = useMessages();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const now = new Date();

    if (socket && socket.readyState === WebSocket.OPEN) {
      const mess = {
        token: tokenInstance.getToken(),
        message: message,
      };
      const messClient = {
        message: message,
        sender_id: data?.data?.id,
        sender_name: data?.data?.fullname,
        created_at: `${now.getHours()}:${now.getMinutes()}`,
      };
      socket.send(JSON.stringify(mess));
      mutate((existingData: RoomMessagesData[] | undefined) => {
        if (!existingData) return undefined;
        const updatedData = { ...existingData };
        const data = {
          data: {
            messages: [messClient, ...updatedData?.[0]?.data?.messages],
            total_count: updatedData?.[0]?.data?.total_count + 1,
          },
        };

        return [data];
      }, false);
      setMessage("");
      inputRef.current?.focus();
      scrollToBottom();
    } else {
      console.error("WebSocket is not open.");
      toast.loading("Websocket is connecting, please wait");
    }
  };

  return (
    <form
      onSubmit={handleMessage}
      className="w-full max-w-[600px] sticky bottom-3"
    >
      <div className="flex gap-1 justify-between mt-2">
        <Input
          ref={inputRef}
          placeholder="Send a message"
          classNames={{
            inputWrapper: ["bg-[#292929]"],
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          color="primary"
          variant="solid"
          disabled={!message?.length || !message?.trim()}
          className="rounded-full p-2"
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

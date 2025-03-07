import SendIcon from "@/shared/assets/icons/SendIcon";
import { useSocketStore } from "@/shared/store/socket.store";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { FormEvent, TouchEvent, useRef, useState } from "react";
import useSWR from "swr";
import useMessages from "@/shared/hooks/useMessages";
import toast from "react-hot-toast";
import { sendMessage } from "@/features/chat/model/model";
import useScrollBottom from "@/shared/hooks/useScrollBottom";

const MessageInput = () => {
  const { data } = useSWR("/user/me");
  const [message, setMessage] = useState("");
  const { socket } = useSocketStore();
  const { mutate } = useMessages();
  const inputRef = useRef<HTMLInputElement>(null);
  const { scrollToBottom } = useScrollBottom();

  const handleMessage = async (
    e: FormEvent<HTMLFormElement> | TouchEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not open.");
      toast.loading("Network error, please wait");
      return;
    }
    sendMessage(socket, message, mutate, data?.data?.id, data?.data?.fullname);
    setMessage("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 300);

    scrollToBottom();
  };

  return (
    <footer className="shadow-2xl bg-[#fff] dark:bg-[#231942] flex items-center justify-center p-2 w-[100%] sticky bottom-0">
      <form onSubmit={handleMessage} className="w-full max-w-[600px]">
        <div className="flex gap-1 justify-between mt-2">
          <Input
            ref={inputRef}
            placeholder="Send a message"
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
            onTouchEnd={handleMessage}
          >
            <SendIcon />
          </Button>
        </div>
      </form>
    </footer>
  );
};

export default MessageInput;

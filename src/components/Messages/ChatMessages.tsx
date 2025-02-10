import * as I from "@/shared/types";
import { useMemo } from "react";
const ChatMessages = ({
  messages,
  id,
}: {
  messages: I.Message[];
  id: number;
}) => {
  const messageParser = useMemo(() => {
    return messages
      ?.slice()
      .reverse()
      .map((mess) => {
        return (
          <div
            key={mess?.id}
            className={`${mess?.sender_id === id ? "bg-[#124c12]" : "bg-[blue]"} ${mess?.sender_id === id ? "ml-auto" : "mr-auto"} p-4 rounded-md text-white`}
          >
            <p>{mess?.message}</p>
            <p>{mess?.sender_name}</p>
          </div>
        );
      });
  }, [messages, id]);

  return <>{messageParser}</>;
};

export default ChatMessages;

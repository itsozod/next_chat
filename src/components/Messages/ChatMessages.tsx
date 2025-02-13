import useMessages from "@/shared/hooks/useMessages";
import { useMemo } from "react";
const ChatMessages = ({ id }: { id: number }) => {
  const { messages } = useMessages();
  const messageParser = useMemo(() => {
    return messages
      ?.slice()
      .reverse()
      .map((mess) => {
        return (
          <div
            key={mess?.id}
            className={`flex gap-3 justify-center ${mess?.sender_id === id ? "bg-[#124c12]" : "bg-[blue]"} ${mess?.sender_id === id ? "ml-auto" : "mr-auto"} p-4 rounded-md text-white`}
          >
            <p className="flex justify-center items-center rounded-[50%] bg-white text-black w-[20px] h-[20px]">
              {mess?.sender_name?.[0]?.toUpperCase()}
            </p>
            <div>
              <p className="text-[0.9rem]">{mess?.sender_name}</p>
              <strong className="text-[1rem]">{mess?.message}</strong>
              <p>{mess?.created_at?.slice(11, 16)?.replace("T", " ")}</p>
            </div>
          </div>
        );
      });
  }, [messages, id]);

  return <>{messageParser}</>;
};

export default ChatMessages;

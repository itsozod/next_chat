import useMessages from "@/shared/hooks/useMessages";
import { useMemo } from "react";
import * as I from "@/shared/types";
const ChatMessages = ({ id }: { id: number }) => {
  const { messages } = useMessages();
  const messageParser = useMemo(() => {
    return messages
      ?.slice()
      .reverse()
      .map((mess: I.Message) => {
        return (
          <div
            key={mess?.id}
            className={`flex gap-3 justify-center ${mess?.sender_id === id ? "bg-primary-100" : "bg-[#404048]"} ${mess?.sender_id === id ? "ml-auto" : "mr-auto"} p-4 rounded-md text-white`}
          >
            <p className="flex justify-center items-center rounded-[50%] bg-white text-black w-[20px] h-[20px]">
              {mess?.sender_name?.[0]?.toUpperCase() ||
                mess?.sender_username?.[0]}
            </p>
            <div>
              <p className="text-[0.9rem]">
                {mess?.sender_name || mess?.sender_fullname}
              </p>
              <strong className="text-[1rem]">{mess?.message}</strong>
              <p>
                {mess?.created_at?.slice(11, 16)?.replace("T", " ") ||
                  mess?.time}
              </p>
            </div>
          </div>
        );
      });
  }, [messages, id]);

  return <>{messageParser}</>;
};

export default ChatMessages;

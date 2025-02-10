import * as I from "@/shared/types";
const Messages = ({ message, id }: { message: I.Message; id: number }) => {
  return (
    <div
      key={message?.id}
      className={`${message?.sender_id === id ? "bg-[#124c12]" : "bg-[blue]"} ${message?.sender_id === id ? "ml-auto" : "mr-auto"} p-4 rounded-md text-white`}
    >
      <p>{message?.message}</p>
      <p>{message?.sender_name}</p>
    </div>
  );
};

export default Messages;

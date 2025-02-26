import { MessageSquare } from "@/shared/assets/icons/messageSquare";

const NoChatSelected = () => {
  return (
    <div className="flex justify-center p-3">
      <div className="flex gap-3">
        <MessageSquare /> Welcome to Next Chat, select a chat to continue
      </div>
    </div>
  );
};

export default NoChatSelected;

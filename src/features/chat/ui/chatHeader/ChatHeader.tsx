import { Avatar } from "@heroui/avatar";
import { useSearchParams } from "react-router-dom";

const ChatHeader = () => {
  const [search] = useSearchParams();
  if (!search.get("room_id")) return;

  return (
    <div className="bg-[#fff] sticky top-16 w-full mb-1 dark:bg-[#231942] p-2">
      <div className="flex items-center gap-3">
        <Avatar />
        <p>{search.get("room_name")}</p>
      </div>
    </div>
  );
};

export default ChatHeader;

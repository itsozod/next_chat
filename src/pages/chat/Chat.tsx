import UserIcon from "@/assets/icons/UserIcon";
import { Input } from "@heroui/input";
import { useState } from "react";
import useSWR from "swr";

const Chat = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data: rooms } = useSWR(
    searchValue
      ? `http://5.253.62.94:8084/user/search?username=${searchValue}`
      : null
  );
  console.log(rooms);

  return (
    <>
      <div className="p-2">
        <Input
          startContent={<UserIcon />}
          isClearable
          onClear={() => setSearchValue("")}
          value={searchValue}
          classNames={{
            inputWrapper: ["bg-[#292929]"],
          }}
          placeholder="Enter username"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
    </>
  );
};

export default Chat;

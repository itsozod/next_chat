import { GroupIcon } from "@/shared/assets/icons/group";
import UserIcon from "@/shared/assets/icons/UserIcon";
import useMessages from "@/shared/hooks/useMessages";
import Loader from "@/shared/ui/loader/Loader";
import { Avatar } from "@heroui/avatar";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import * as I from "@/entities";
import MobileRooms from "../mobileRooms/MobileRooms";
import { useState } from "react";

const MobileContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: rooms, isLoading } = useSWR<I.Rooms>("/user/my-rooms");
  const { handleRoomClick } = useMessages();
  const [search] = useSearchParams();

  if (isLoading)
    return (
      <div className="flex justify-start p-2">
        <Loader />
      </div>
    );

  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center justify-center gap-3">
        {!rooms?.data?.length && <div>You got no rooms yet!</div>}
        {rooms?.data?.map((room) => (
          <button
            key={room.id}
            onClick={() => {
              handleRoomClick(room.id, room.name);
              setIsOpen(true);
            }}
            className={`
            w-full h-auto p-3 flex flex-row items-center gap-3
            hover:bg-primary hover:text-white ${Number(search.get("room_id")) === room.id ? "bg-primary text-white" : ""}`}
          >
            {room?.is_group ? (
              <div>
                <Avatar icon={<GroupIcon />} />
              </div>
            ) : (
              <div className="relative mx-auto lg:mx-0">
                <Avatar icon={<UserIcon />} />
              </div>
            )}

            <div
              className={`w-full flex whitespace-nowrap overflow-hidden text-ellipsis sm:text-[1rem]`}
            >
              {room.name}
            </div>
          </button>
        ))}
      </div>
      <MobileRooms isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default MobileContent;

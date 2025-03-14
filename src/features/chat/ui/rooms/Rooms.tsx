import UserIcon from "@/shared/assets/icons/UserIcon";
import { GroupIcon } from "@/shared/assets/icons/group";
import * as I from "@/entities";
import { Avatar } from "@heroui/avatar";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useSearchParams } from "react-router-dom";
const Rooms = ({
  rooms,
  handleRoomClick,
  className,
}: {
  rooms: I.Rooms;
  handleRoomClick: (roomId: number, roomName: string) => void;
  className?: string;
}) => {
  const [search] = useSearchParams();
  const isMediumDevice = useMediaQuery("only screen and (max-width: 1023px)");

  return (
    <div className={className}>
      {rooms?.data?.map((room) => (
        <button
          key={room.id}
          onClick={() => {
            if (Number(search.get("room_id")) === room.id) return;
            handleRoomClick(room.id, room.name);
          }}
          className={`
      w-full h-full p-3 flex ${isMediumDevice ? "flex-col justify-start items-center" : "flex-row items-center gap-3"}
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
            className={`${isMediumDevice ? "block w-full" : "flex"} whitespace-nowrap overflow-hidden text-ellipsis sm:text-[1rem]`}
          >
            {room.name}
          </div>
        </button>
      ))}
    </div>
  );
};

export default Rooms;

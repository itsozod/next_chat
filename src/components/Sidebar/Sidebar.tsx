import UserIcon from "@/assets/icons/UserIcon";
import { GroupIcon } from "@/shared/assets/icons/group";
import useMessages from "@/shared/hooks/useMessages";
import Loader from "@/shared/ui/loader/Loader";
import { Avatar } from "@heroui/avatar";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import CreateRoomModal from "../modals/CreateRoom/CreateRoomModal";
import { useMediaQuery } from "@uidotdev/usehooks";

interface Room {
  id: number;
  name: string;
  is_group: boolean;
}

const Sidebar = () => {
  const [search] = useSearchParams();
  const { data: rooms, isLoading } = useSWR("/user/my-rooms");
  const isMediumDevice = useMediaQuery("only screen and (max-width: 1023px)");
  const { handleRoomClick } = useMessages();

  return (
    <aside className="no-scrollbar sticky top-0 bottom-0 overflow-auto h-[100vh] w-20 lg:w-[400px] border-r border-base-300 flex flex-col transition-all duration-200">
      {isLoading ? (
        <div className="flex justify-start p-2">
          <Loader />
        </div>
      ) : (
        <>
          <div className="border-b border-base-300 w-full p-5">
            <div className="flex items-center gap-2">
              <span className="font-medium hidden lg:block text-[1.5rem]">
                Chats
              </span>
            </div>
          </div>
          <CreateRoomModal />
          <div className="flex flex-col gap-3 items-start overflow-y-autopy-3">
            {rooms?.data?.map((room: Room) => (
              <button
                key={room.id}
                onClick={() => {
                  if (Number(search.get("room_id")) === room.id) return;
                  handleRoomClick(room.id);
                }}
                className={`
                w-full h-full p-3 flex ${isMediumDevice ? "flex-col justify-start items-center" : "flex-row items-center gap-3"}
                hover:bg-purple-950 ${Number(search.get("room_id")) === room.id ? "bg-primary-100" : ""}`}
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
        </>
      )}
    </aside>
  );
};

export default Sidebar;

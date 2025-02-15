import UserIcon from "@/assets/icons/UserIcon";
import { GroupIcon } from "@/shared/assets/icons/group";
import useMessages from "@/shared/hooks/useMessages";
import Loader from "@/shared/ui/loader/Loader";
import { Avatar } from "@heroui/avatar";
import { useNavigate, useSearchParams } from "react-router-dom";
import useSWR from "swr";

interface Room {
  id: number;
  name: string;
  is_group: boolean;
}

const Sidebar = () => {
  const navigate = useNavigate();
  const { data: rooms, isLoading } = useSWR("/user/my-rooms");
  const { setSize } = useMessages();
  const [search] = useSearchParams();
  return (
    <aside className="w-20 lg:w-[400px] border-r border-base-300 flex flex-col transition-all duration-200">
      {isLoading ? (
        <div className="flex justify-start p-2">
          <Loader />
        </div>
      ) : (
        <>
          <div className="border-b border-base-300 w-full p-5">
            <div className="flex items-center gap-2">
              <span className="font-medium hidden lg:block text-primary text-[1.5rem]">
                Chats
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 items-start overflow-y-autopy-3">
            {rooms?.data?.map((room: Room) => (
              <button
                key={room.id}
                onClick={() => {
                  navigate(`/?room_id=${room.id}`);
                  setSize(1);
                }}
                className={`
                  w-full h-full p-3 flex flex-col justify-start sm:flex-row items-center gap-3
                   hover:bg-purple-500 ${Number(search.get("room_id")) === room.id ? "bg-primary-400" : ""}`}
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

                <div className="lg:block text-left">
                  <div className="text-primary sm:text-[1rem]">{room.name}</div>
                  <div className="text-sm text-zinc-400"></div>
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

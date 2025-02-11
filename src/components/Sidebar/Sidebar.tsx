import Loader from "@/shared/ui/loader/Loader";
import { Avatar } from "@heroui/avatar";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";

const Sidebar = () => {
  const { data: rooms, isLoading } = useSWR(
    "http://5.253.62.94:8084/user/my-rooms"
  );
  const [search, setSearch] = useSearchParams();
  return (
    <aside className="h-full w-20 lg:w-[400px] border-r border-base-300 flex flex-col transition-all duration-200 fixed top-18">
      {isLoading ? (
        <div className="flex justify-start p-2">
          <Loader />
        </div>
      ) : (
        <>
          <div className="border-b border-base-300 w-full p-5">
            <div className="flex items-center gap-2">
              {/* <Users className="size-6" /> */}
              <span className="font-medium hidden lg:block text-white text-[1.5rem]">
                Rooms
              </span>
            </div>
            {/* TODO: Online filter toggle */}
          </div>

          <div className="overflow-y-auto w-full py-3">
            {rooms?.data?.map((room) => (
              <button
                key={room.id}
                onClick={() => {
                  search.set("room_id", room.id);
                  setSearch(search);
                }}
                className={`
                    w-full p-3 flex items-center gap-3
                   hover:bg-purple-950
                    ${Number(search.get("room_id")) === room.id ? "bg-purple-600" : ""}
                  `}
              >
                <div className="relative mx-auto lg:mx-0">
                  <Avatar />
                </div>

                {/* User info - only visible on larger screens */}
                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-medium truncate text-white">
                    {room.name}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {/* {onlineUsers.includes(user._id) ? "Online" : "Offline"} */}
                  </div>
                </div>
              </button>
            ))}

            {/* {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
          )} */}
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;

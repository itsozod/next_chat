import useMessages from "@/shared/hooks/useMessages";
import Loader from "@/shared/ui/loader/Loader";
import useSWR from "swr";
import CreateRoomModal from "@/components/rooms/CreateRoom/CreateRoomModal";
import Rooms from "@/components/rooms/Rooms";

const Sidebar = () => {
  const { data: rooms, isLoading } = useSWR("/user/my-rooms");
  const { handleRoomClick } = useMessages();

  return (
    <aside className="no-scrollbar  sticky top-0 bottom-0 overflow-auto h-[100vh] w-20 lg:w-[400px] border-r border-base-300 flex flex-col transition-all duration-200">
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
          <Rooms rooms={rooms} handleRoomClick={handleRoomClick} />
        </>
      )}
    </aside>
  );
};

export default Sidebar;

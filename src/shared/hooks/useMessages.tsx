import { useNavigate, useSearchParams } from "react-router-dom";
import useSWRInfinite from "swr/infinite";
import { RoomMessagesData } from "../../entities";
const useMessages = () => {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const getKey = (pageIndex: number, previousPageData: RoomMessagesData) => {
    const roomId = search.get("room_id");
    if (!roomId) return null;
    pageIndex = pageIndex + 1;

    if (
      previousPageData &&
      previousPageData?.data?.messages?.length >=
        previousPageData?.data?.total_count
    )
      return null;
    return `/room/messages?room_id=${search.get("room_id")}&page=${pageIndex}`;
  };

  const {
    data: roomsMessages,
    size,
    setSize,
    mutate,
    isLoading,
    isValidating,
  } = useSWRInfinite(getKey, {
    revalidateFirstPage: false,
  });

  const messages = roomsMessages
    ? roomsMessages.flatMap((page) => page?.data?.messages)
    : [];

  const isLastPage = messages.length >= roomsMessages?.[0]?.data?.total_count;

  const handleRoomClick = (roomId: number, roomName: string) => {
    navigate(`/?room_id=${roomId}&room_name=${roomName}`);
    setSize(1);
    setTimeout(() => {
      mutate();
    }, 500);
  };

  return {
    messages,
    size,
    setSize,
    isLoading,
    isValidating,
    isLastPage,
    mutate,
    handleRoomClick,
  };
};

export default useMessages;

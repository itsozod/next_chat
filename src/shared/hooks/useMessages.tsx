import { useSearchParams } from "react-router-dom";
import useSWRInfinite from "swr/infinite";
import { RoomMessagesData } from "../types";
const useMessages = () => {
  const [search] = useSearchParams();
  const getKey = (pageIndex: number, previousPageData: RoomMessagesData) => {
    pageIndex = pageIndex + 1;

    if (
      previousPageData &&
      previousPageData?.data?.messages?.length >=
        previousPageData?.data?.total_count
    )
      return null;
    return search.get("room_id")
      ? `/room/messages?room_id=${search.get("room_id")}&page=${pageIndex}`
      : null;
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
  console.log("roomMess", roomsMessages);

  const messages = roomsMessages
    ? roomsMessages.flatMap((page) => page?.data?.messages)
    : [];

  const isLastPage = messages.length >= roomsMessages?.[0]?.data?.total_count;
  // Dependency ensures it runs when room_id changes

  return {
    messages,
    size,
    setSize,
    isLoading,
    isValidating,
    isLastPage,
    mutate,
  };
};

export default useMessages;

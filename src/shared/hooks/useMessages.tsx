import useSWRInfinite from "swr/infinite";
import { useSocketStore } from "../store/socket.store";

const useMessages = () => {
  const { messages } = useSocketStore();
  const {
    data: roomsMessages,
    isLoading,
    isValidating,
    setSize,
    size,
  } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      pageIndex = pageIndex + 1;

      if (previousPageData && isLastPage) return null;
      return `http://5.253.62.94:8084/room/messages?room_id=4&page=${pageIndex}`;
    },
    {
      revalidateFirstPage: false,
    }
  );

  const isLastPage = messages?.length >= roomsMessages?.[0]?.data?.total_count;
  return { roomsMessages, isLoading, isValidating, setSize, size, isLastPage };
};

export default useMessages;

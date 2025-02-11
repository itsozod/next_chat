import useSWRInfinite from "swr/infinite";
import { useSocketStore } from "../store/socket.store";
import { useSearchParams } from "react-router-dom";

const useMessages = () => {
  const { messages } = useSocketStore();
  const [search] = useSearchParams();
  const {
    data: roomsMessages,
    error,
    isLoading,
    isValidating,
    setSize,
    size,
  } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      pageIndex = pageIndex + 1;

      if (previousPageData && isLastPage) return null;
      return `http://5.253.62.94:8084/room/messages?room_id=${search.get("room_id")}&page=${pageIndex}`;
    },
    {
      revalidateFirstPage: false,
    }
  );

  const isLastPage = messages?.length >= roomsMessages?.[0]?.data?.total_count;

  return {
    roomsMessages,
    isLoading,
    isValidating,
    setSize,
    size,
    isLastPage,
    error,
  };
};

export default useMessages;

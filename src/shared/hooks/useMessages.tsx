// import useSWRInfinite from "swr/infinite";
import { useSocketStore } from "../store/socket.store";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";

const useMessages = () => {
  const { messages, page } = useSocketStore();
  const [search] = useSearchParams();

  const {
    data: roomsMessages,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(
    search.get("room_id")
      ? `http://5.253.62.94:8084/room/messages?room_id=${search.get("room_id")}&page=${page}`
      : null,
    {
      dedupingInterval: 0,
    }
  );

  const isLastPage = messages?.length >= roomsMessages?.data?.total_count;

  return {
    roomsMessages,
    isLoading,
    isValidating,
    isLastPage,
    mutate,
  };
};

export default useMessages;

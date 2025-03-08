import { useSocketStore } from "@/entities/socket/model/socket.store";
import { useEffect, useRef } from "react";

const useScrollBottom = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { bottomRef, setBottomRef } = useSocketStore();

  const scrollToBottom = () => {
    setTimeout(() => {
      if (bottomRef) {
        bottomRef.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  useEffect(() => {
    if (ref.current) {
      setBottomRef(ref.current);
    }
  }, [ref.current]);
  return { ref, scrollToBottom };
};

export default useScrollBottom;

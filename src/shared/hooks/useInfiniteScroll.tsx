import { useCallback, useRef } from "react";
import { useSocketStore } from "../store/socket.store";

const useInfiniteScroll = (
  isValidating: boolean,
  isLastPage: boolean,
  isLoading: boolean
) => {
  const loaderRef = useRef<IntersectionObserver>();
  const { page, setPage } = useSocketStore();

  const fetchNextPage = useCallback(
    (entries: any) => {
      const target = entries[0];
      if (target.isIntersecting && !isLastPage) {
        setPage(page + 1);
        if (target.target.parentElement) {
          target.target.parentElement.scrollBy({
            top: 150,
            behavior: "smooth",
          });
        }
      }
    },
    [page]
  );

  const handleLoaderRef = useCallback(
    (node: HTMLDivElement) => {
      if (isValidating || isLoading || isLastPage) return;
      if (loaderRef.current) loaderRef.current.disconnect();
      loaderRef.current = new IntersectionObserver(fetchNextPage, {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      });
      if (node) loaderRef.current.observe(node);
    },
    [fetchNextPage, isValidating, isLastPage, isLoading]
  );
  return { handleLoaderRef };
};

export default useInfiniteScroll;

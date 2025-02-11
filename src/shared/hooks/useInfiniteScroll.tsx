import { useCallback, useRef } from "react";

const useInfiniteScroll = (
  setSize: (value: number) => Promise<any[] | undefined>,
  size: number,
  isValidating: boolean,
  isLastPage: boolean,
  isLoading: boolean
) => {
  const loaderRef = useRef<IntersectionObserver>();

  const fetchNextPage = useCallback(
    (entries: any) => {
      const target = entries[0];

      if (target.isIntersecting && !isValidating && !isLoading && !isLastPage) {
        setSize(size + 1).then(() => {
          if (target.target.parentElement) {
            target.target.parentElement.scrollBy({
              top: 15,
              behavior: "smooth",
            });
          }
        });
      }
    },
    [size, isValidating, isLastPage, isLoading, setSize]
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

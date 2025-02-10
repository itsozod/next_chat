import { ReactNode } from "react";
import { SWRConfig } from "swr";
import { fetcher } from "./fetcher";
import { toast } from "react-hot-toast";

const SWRProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig
      value={{
        onError(err) {
          toast.error(`Error while fetching, ${err}`, {
            position: "top-right",
          });
        },
        fetcher: fetcher,
        revalidateOnReconnect: false,
        revalidateOnFocus: false,
        dedupingInterval: 1000000,
        shouldRetryOnError: false,
        keepPreviousData: true,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRProvider;

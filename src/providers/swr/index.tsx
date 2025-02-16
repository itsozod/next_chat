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
            duration: 3000,
          });
        },
        fetcher: fetcher,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRProvider;

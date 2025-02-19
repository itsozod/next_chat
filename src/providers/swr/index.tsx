import { ReactNode } from "react";
import { SWRConfig } from "swr";
import { fetcher } from "./fetcher";
import { toast } from "react-hot-toast";

const SWRProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig
      value={{
        onError(err) {
          toast.error(` ${err}`, {
            position: "top-right",
          });
        },
        fetcher: fetcher,
        revalidateOnReconnect: false,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRProvider;

import { ReactNode } from "react";
import { SWRConfig } from "swr";
import { fetcher } from "./fetcher";

const SWRProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig
      value={{
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

import { fetcher } from "@/providers/swr/fetcher";

export const createRoom = async (url: string, { arg = {} }) => {
  const res = await fetcher(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
  return res;
};

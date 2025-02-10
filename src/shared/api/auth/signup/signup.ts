import { fetcher } from "@/providers/swr/fetcher";

export const signUp = async (url: string, { arg = {} }) => {
  await fetcher(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
};

import { authFetcher } from "@/app/providers/swr/authFetcher";

export const signUp = async (url: string, { arg = {} }) => {
  const res = await authFetcher(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
  return res;
};

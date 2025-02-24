import { authFetcher } from "@/providers/swr/authFetcher";
import * as I from "@/shared/types";

export const signIn = async (
  url: string,
  { arg }: { arg: I.FormData }
): Promise<I.LoginData> => {
  const res = await authFetcher(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
  return res;
};

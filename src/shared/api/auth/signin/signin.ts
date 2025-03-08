import { authFetcher } from "@/app/providers/swr/authFetcher";
import * as I from "@/entities";

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

import { fetcher } from "@/providers/swr/fetcher";
import { profileFetcher } from "@/providers/swr/profileFetcher";

export const changePassword = async (url: string, { arg = {} }) => {
  const res = await fetcher(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
  return res;
};

export const handleUpload = async (url: string, { arg = {} }) => {
  const res = await profileFetcher(url, {
    method: "POST",
    body: arg as FormData,
  });
  return res;
};

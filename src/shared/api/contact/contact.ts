import { fetcher } from "@/app/providers/swr/fetcher";

export const addContact = async (url: string, { arg = {} }) => {
  const res = await fetcher(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
  return res;
};

export const deleteContact = async (url: string, { arg = {} }) => {
  const res = await fetcher(url, {
    method: "DELETE",
    body: JSON.stringify(arg),
  });
  return res;
};

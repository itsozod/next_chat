import { tokenInstance } from "@/shared/utils/token/tokenInstance";
import toast from "react-hot-toast";

export const authFetcher = async (url: string, options: RequestInit = {}) => {
  const { getToken } = tokenInstance;
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };
  const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    toast.error(`${response.statusText}`, {
      position: "top-right",
      duration: 3000,
    });
  }
  return await response.json();
};

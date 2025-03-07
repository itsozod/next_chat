import { refreshToken } from "@/app/providers/swr/fetcher";
import { tokenInstance } from "@/shared/utils/token/tokenInstance";
import toast from "react-hot-toast";

export const profileFetcher = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const { getToken } = tokenInstance;
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };
  const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
    ...options,
    headers,
    cache: "no-store",
  });

  const method = options.method || "GET";

  if (response.status === 401) {
    const refreshed = await refreshToken();
    if (refreshed) {
      return profileFetcher(url);
    } else {
      throw new Error("Unauthorized");
    }
  }

  if (!response.ok) {
    toast.error(`${response.statusText}`, {
      position: "top-right",
      duration: 3000,
    });
  } else if (response.ok && method !== "GET") {
    toast.success("Operation successful", {
      position: "top-right",
      duration: 3000,
    });
  }
  const data = await response.blob();
  const img = URL.createObjectURL(data);
  return img;
};

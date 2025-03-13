import { fetcherErrorHandler } from "@/shared/helpers/errorHandler";
import { tokenInstance } from "@/shared/utils/token/tokenInstance";

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
    fetcherErrorHandler(response);
  }
  return await response.json();
};

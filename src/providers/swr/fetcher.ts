import { tokenInstance } from "@/utils/helpers/token/tokenInstance";

export const fetcher = async (url: string, options: RequestInit = {}) => {
  const { getToken } = tokenInstance;
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };
  const response = await fetch(import.meta.env.VITE_BASE_URL + url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    window.location.href = "/signin";
  }

  if (!response.ok) {
    const errorResp = await response.json();
    throw new Error(`${errorResp.error || response.statusText}`);
  }
  return await response.json();
};

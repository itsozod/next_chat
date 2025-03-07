import { tokenInstance } from "@/shared/utils/token/tokenInstance";
import toast from "react-hot-toast";

export const fetcher = async (
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
  });

  const method = options.method || "GET";

  if (response.status === 401) {
    const refreshed = await refreshToken();
    if (refreshed) {
      return fetcher(url);
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
  return await response.json();
};

export const refreshToken = async () => {
  const refreshToken = tokenInstance.getRefreshToken();

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
      {
        method: "POST",
        body: JSON.stringify({ refresh_token: refreshToken }),
      }
    );

    if (!response.ok) throw new Error("Failed to refresh token");

    const data = await response.json();
    tokenInstance.setToken(data?.data?.access_token.token);
    tokenInstance.setRefreshToken(data?.data?.refresh_token.token);
    return true;
  } catch (error) {
    localStorage.clear();
    window.location.href = "/login";
    return false;
  }
};

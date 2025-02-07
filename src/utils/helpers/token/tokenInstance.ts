import { USER_TOKEN_KEY_LOCALSTORAGE } from "@/utils/constants";

export const tokenInstance = {
  setToken: (token: string) => {
    localStorage.setItem(USER_TOKEN_KEY_LOCALSTORAGE, token);
  },
  getToken: () => {
    return localStorage.getItem(USER_TOKEN_KEY_LOCALSTORAGE) || "";
  },
  clearToken: () => {
    localStorage.removeItem(USER_TOKEN_KEY_LOCALSTORAGE);
  },
};

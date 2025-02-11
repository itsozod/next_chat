import { create } from "zustand";
import * as I from "@/shared/types";

type SocketStore = {
  page: number;
  socket: WebSocket | null;
  messages: I.Message[] | [];
  setSocket: (socket: WebSocket) => void;
  setMessages: (
    messages: I.Message[] | ((prev: I.Message[]) => I.Message[])
  ) => void;
  setPage: (page: number) => void;
};

export const useSocketStore = create<SocketStore>((set) => ({
  page: 1,
  socket: null,
  messages: [],
  setSocket: (socket) => set({ socket }),
  setMessages: (messages) =>
    set((state) => ({
      messages:
        typeof messages === "function" ? messages(state.messages) : messages,
    })),
  setPage: (page) => set({ page }),
}));

import { create } from "zustand";
import * as I from "@/shared/types";

type SocketStore = {
  socket: WebSocket | null;
  messages: I.Message[] | [];
  setSocket: (socket: WebSocket) => void;
  setMessages: (
    messages: I.Message[] | ((prev: I.Message[]) => I.Message[])
  ) => void;
};

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  messages: [],
  setSocket: (socket) => set({ socket }),
  setMessages: (messages) =>
    set((state) => ({
      messages:
        typeof messages === "function" ? messages(state.messages) : messages,
    })),
}));

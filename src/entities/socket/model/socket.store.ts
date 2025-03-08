import { create } from "zustand";
import { SocketStore } from "./socket.model";

export const useSocketStore = create<SocketStore>((set) => ({
  bottomRef: null,
  socket: null,
  setSocket: (socket) => set({ socket }),
  setBottomRef: (bottomRef) => set({ bottomRef }),
}));

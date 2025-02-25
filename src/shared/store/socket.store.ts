import { create } from "zustand";

type SocketStore = {
  bottomRef: HTMLDivElement | null;
  socket: WebSocket | null;
  setSocket: (socket: WebSocket) => void;
  setBottomRef: (bottomRef: HTMLDivElement | null) => void;
};

export const useSocketStore = create<SocketStore>((set) => ({
  bottomRef: null,
  socket: null,
  setSocket: (socket) => set({ socket }),
  setBottomRef: (bottomRef) => set({ bottomRef }),
}));

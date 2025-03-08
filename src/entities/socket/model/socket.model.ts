export type SocketStore = {
  bottomRef: HTMLDivElement | null;
  socket: WebSocket | null;
  setSocket: (socket: WebSocket) => void;
  setBottomRef: (bottomRef: HTMLDivElement | null) => void;
};

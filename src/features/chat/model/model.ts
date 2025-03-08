import { tokenInstance } from "@/shared/utils/token/tokenInstance";
import * as I from "@/entities";
import { MutateFn } from "@/features/chat/types/types";

export const sendMessage = (
  socket: WebSocket,
  message: string,
  mutate: MutateFn<I.RoomMessagesData[] | undefined>,
  id: number,
  fullname: string
) => {
  const now = new Date();

  const serverMessage = {
    token: tokenInstance.getToken(),
    message: message,
  };
  const clientMessage = {
    message: message,
    sender_id: id,
    sender_name: fullname,
    created_at: `${now.getHours()}:${now.getMinutes()}`,
  };
  socket.send(JSON.stringify(serverMessage));
  mutate((existingData: I.RoomMessagesData[] | undefined) => {
    if (!existingData) return undefined;
    const updatedData = { ...existingData };
    const data = {
      data: {
        messages: [
          clientMessage as I.Message,
          ...updatedData?.[0]?.data?.messages,
        ],
        total_count: updatedData?.[0]?.data?.total_count + 1,
      },
    };

    return [data];
  }, false);
};

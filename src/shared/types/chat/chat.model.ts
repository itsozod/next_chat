export interface Message {
  id: number;
  sender_id: number;
  message: string;
  sender_name: string;
  username: string;
  created_at: string;
}

export type ExistingData = {
  data: {
    messages: Message[];
    total_count: number;
  };
};

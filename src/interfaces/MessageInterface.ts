export interface IMessage {
  id: number;
  guest_uuid: string;
  message: string;
  display_name: string;
  created_at: string;
}

export interface IMessageRequest {
  guest_uuid: string;
  message: string;
  display_name: string;
}
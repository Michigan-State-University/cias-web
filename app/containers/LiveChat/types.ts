export interface IChatMessage {
  message: string;
  isMine?: boolean;
  senderName?: string;
  read?: boolean;
}

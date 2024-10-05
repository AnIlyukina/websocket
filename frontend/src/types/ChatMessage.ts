export enum Sender {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
}

export interface ChatMessage {
  sender: Sender;
  text: string;
}

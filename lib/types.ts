export interface Message {
  sender: "user" | "bot";
  text: string;
  question?: string;
}

export interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

"use client";

import { useState } from "react";
import ChatArea from "@/components/ChatArea";

export interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "user",
      text: "Aku tadi makan nasi goreng dan es teh manis, kalorinya berapa ya?",
    },
    {
      sender: "bot",
      text: `Perkiraan total kalori:

• Nasi goreng: ± 630 kkal
• Es teh manis: ± 120 kkal

Total konsumsi sekitar 750 kkal`,
    },
  ]);

  const sendMessage = (message: string) => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: message,
      },
      {
        sender: "bot",
        text: `${message}`,
      },
    ]);
  };

  return (
    <main className="h-screen bg-[#F7F8FC]">
      <ChatArea
        messages={messages}
        onSend={sendMessage}
      />
    </main>
  );
}